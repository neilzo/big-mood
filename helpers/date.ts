import moment from 'moment';

const getPrettyDate = (date: Date) => moment(date).format('MMM Do YYYY');

const getPrettyTime = (date: Date) => moment(date).format('h:mma');

export default { getPrettyDate, getPrettyTime };
