import moment from 'moment';

export const dateOnly = (date = moment()) => moment(date).format('YYYY/MM/DD');
