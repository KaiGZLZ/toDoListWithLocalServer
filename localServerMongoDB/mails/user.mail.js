
let userMails = {

    /**
     * @param {string} url - url to redirect, to make the activation of the account
     * @param {*} token - token to make the activation of the account
     */
    activateAccountMail: (url, token) => {
        return`<p><strong>Please</strong> <a href="${url + "#" + token}">Click here!</a> to recover your password</p>`
    },

    /**
     * @param {string} url - url to redirect, to make the change of the password
     * @param {string} token - token to make the change of the password
     */
    recoverPasswordMail: (url, token) => {
        return`<p><strong>Please</strong> <a href="${url + "#" + token}">Click here!</a> to recover your password</p>`
    }
}

module.exports = userMails;
