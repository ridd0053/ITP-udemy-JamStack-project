'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */
 const { sanitizeEntity } = require("strapi-utils");
 const stripe = require("stripe")(process.env.STRIPE_SK)

 const GUEST_ID = "62703e40b303b3478033f5c9";
module.exports = {
    async process(ctx) {
        const {
            items,
            total,
            shippingOption,
            idempotencyKey,
            storedIntent,
            email,
        } = ctx.request.body

        let serverTotal = 0
        let unavailable = []

        await Promise.all(
            items.map( async (clientItem) => {
                const serverItem = await strapi.services.variant.findOne({
                    id: clientItem.variant.id})
                
                if ( serverItem.qty < clientItem.qty ) {
                    unavailable.push({id: serverItem.id, qty: serverItem.qty})
                } 
                serverTotal += serverItem.price * clientItem.qty
            })
        )

         // only executed after everything in Promise.all has completed SUCCESSFULLY
         const shippingOptions = [
            {label: "FREE SHIPPING", price: 0},
            {label: "2-DAY SHIPPING", price: 9.99},
            {label: "OVERNIGHT SHIPPING", price: 29.99},
        ]

        const shippingValid = shippingOptions.find(option => option.label === shippingOption.label && option.price === shippingOption.price)
        if (shippingValid === undefined || (serverTotal * 1.21 + shippingValid.price).toFixed(2) !== total) {
            ctx.send({error: "Invalid Cart"}, 400)
        } else if(unavailable.length > 0) {
            ctx.send({error: "Items are unavailable", unavailable: unavailable}, 409)
        } else {
            if (storedIntent) {
                const update = await stripe.paymentIntents.update(storedIntent, { amount: total * 100 }, { idempotencyKey })
                ctx.send({ client_secret: update.client_secret, intentID: update.id }, 200)
            } else {
                const intent = await stripe.paymentIntents.create({ amount: total * 100, currency:'eur', customer: ctx.state.user ? ctx.state.user.stripeID : undefined, receipt_email: email }, { idempotencyKey })
                ctx.send({ client_secret: intent.client_secret, intentID: intent.id }, 200)
            }
            
        }       

    },
    async place(ctx) {       

        const {
            shippingAddress, 
            billingAddress, 
            shippingInfo, 
            billingInfo, 
            shippingOption,
            subtotal,
            tax,
            total,
            items,
        } = ctx.request.body

        let orderCustomer;
        if ( ctx.state.user ) {
            orderCustomer = ctx.state.user.id
        } else {
            orderCustomer = GUEST_ID
        }

        let serverTotal = 0
        let unavailable = []

        await Promise.all(
            items.map( async (clientItem) => {
                const serverItem = await strapi.services.variant.findOne({
                    id: clientItem.variant.id})
                
                if ( serverItem.qty < clientItem.qty ) {
                    unavailable.push({id: serverItem.id, qty: serverItem.qty})
                } else {
                    await strapi.services.variant.update({id: clientItem.variant.id}, {qty: serverItem.qty - clientItem.qty})
                }
                serverTotal += serverItem.price * clientItem.qty
            })
        )
        // only executed after everything in Promise.all has completed SUCCESSFULLY
        const shippingOptions = [
            {label: "FREE SHIPPING", price: 0},
            {label: "2-DAY SHIPPING", price: 9.99},
            {label: "OVERNIGHT SHIPPING", price: 29.99},
        ]

        const shippingValid = shippingOptions.find(option => option.label === shippingOption.label && option.price === shippingOption.price)
        if (shippingValid === undefined || (serverTotal * 1.21 + shippingValid.price).toFixed(2) !== total) {
            ctx.send({error: "Invalid Cart"}, 400)
        } else if(unavailable.length > 0) {
            ctx.send({error: "Items are unavailable", unavailable: unavailable}, 409)
        } else {
            var order = await strapi.services.order.create({ 
                shippingAddress, 
                billingAddress, 
                shippingInfo, 
                billingInfo, 
                shippingOption,
                subtotal,
                tax,
                total,
                items,
                user: orderCustomer, 
             })
             order = sanitizeEntity(order, { model: strapi.models.order })
            if (order.user.username === "Guest") {
                order.user = { username: "Guest"}
            }
            ctx.send({ order }, 200)
        }

    },
};
