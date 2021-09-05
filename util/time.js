import moment from 'moment';
import { i18n } from '../i18n';

const timeFormatter = (time) => {
  const timeIns = moment(time, moment.ISO_8601);
  const current = moment();
  const yearTarget = timeIns.year();
  const yearCurrent = current.year();
  const monthTarget = timeIns.month();
  const monthCurrent = current.month();
  const dateTarget = timeIns.date();
  const dateCurrent = current.date();
  const diffHour = current.diff(timeIns, 'hours');
  const diffMin = current.diff(timeIns, 'minutes');
  if (
    yearCurrent === yearTarget &&
    monthCurrent === monthTarget &&
    dateCurrent === dateTarget
  ) {
    if (diffHour < 1) {
      return `${diffMin}${i18n('TIME.minute')}${i18n('TIME.ago')}`;
    } else {
      return `${diffHour}${i18n('TIME.hour')}${i18n('TIME.ago')}`;
    }
  } else if (yearCurrent === yearTarget && monthCurrent === monthTarget) {
    return timeIns.format('MM-DD');
  } else if (yearCurrent === yearTarget) {
    return timeIns.format('MM-DD');
  } else {
    return timeIns.format('YYYY-MM-DD');
  }
};

export default { timeFormatter };
