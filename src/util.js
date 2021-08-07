import moment from 'moment'

export function tempo() {
    const date = moment();
    return date.format('HH:mm:SSSS');
}

export function soNumeros(data) {
    return data.replace(/[^0-9]/gi, "");
}

