import moment from 'moment';

const getPrettyDate = (date: string) => moment(date).format('MMM Do YYYY');

const getPrettyTime = (date: string) => moment(date).format('h:mma');

export default { getPrettyDate, getPrettyTime };
