const http = require('axios');

module.exports = {
    crack() {
        let success = false

        let start = new Date().getTime()

        for (let i = 0; i < 10; i++) {
            for (let j = 0; j < 10; j++) {
                for (let k = 0; k < 10; k++) {

                    let code = {
                        first: i,
                        second: j,
                        third: k
                    }

                    if (!success) {
                        this.fetch(code, start).then(isSuccess => {
                            if (isSuccess) {
                                success = true
                                let time = (new Date().getTime() - start) / 1000
                                console.log('END : ' + time)
                            }
                        })
                    }

                }
            }
        }
    },

    fetch(code, start) {
        let message = ''
        return http.post('https://qcvault.herokuapp.com/unlock_safe', code)
            .then(res => {
                message = res.data
            })
            .catch(err => {
                // nothing
            })
            .then(() => {
                let time = (new Date().getTime() - start) / 1000
                console.log(this.displayCode(code) + ' | ' + message + ' | ' + time)
                return message !== 'Wrong code'
            })
    },

    displayCode(code) {
        return code.first + '-' + code.second + '-' + code.third
    }
}
