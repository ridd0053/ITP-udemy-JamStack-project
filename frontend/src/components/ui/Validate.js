export default function validate(values) {
    // iput: values = {field: value, field2: value}
    // output: {field: valid} {field2: valid}

    const validators = {
        email: val =>  /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(val),
        phone: val =>  /^([0-9]{9,})$/.test(val),
        name: val => val.length > 0,
        message: val => val.length > 3,
        password: val => /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/.test(val),
        confirmation: val => /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/.test(val),
        street: val => /^([1-9][e][\s])*([a-zA-Z]+(([\.][\s])|([\s]))?)+[1-9][0-9]*(([-][1-9][0-9]*)|([\s]?[a-zA-Z]+))?$/i.test(val),
        zip: val => /^[1-9][0-9]{3} ?(?!sa|sd|ss)[a-z]{2}$/i.test(val),
    }

    const valid = {}

    Object.keys(values).map(field => {
        valid[field] = validators[field](values[field])
    })

    return valid
}