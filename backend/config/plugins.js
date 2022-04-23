module.exports = ({ env }) => (
    { email: {
        provider: "sendgrid",
        providerOptions: {
            apiKey: env("SENDGRID_API_KEY")
        },
        settings: {
            defaultFrom: "ridd0053@hz.nl",
            defaultTo: "ridd0053@hz.nl"
        }
    } }
)