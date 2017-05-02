import React from 'react';
import moment from 'moment';
import {} from 'moment-range';
import DateRangePicker from '../src';

import Header from './components/header';

const Index = React.createClass({
  getInitialState() {
    return {
      locale: 'en'
    };
  },
  _selectLocale() {
    const locale = this.refs.locale.value;
    if (locale !== 'en') {
      require(`moment/locale/${locale}`);
    }
    moment.locale(locale);

    this.setState({
      locale: locale
    });
  },
  handleDate(newDate) {
    let dateState = {}
    switch (newDate.target.value) {
    case 'today':
      const now = moment();
      const range = moment.range(now, now);
      dateState.range = range;
      dateState.state = 'enquire';
      break;
    case 'yesterday':
      dateState.range = {};
      dateState.state = '';
      break;
    case 'custom':
      dateState.range = {};
      dateState.state = '';
      break;
    }
    this.setState([{dateState}]);
  },
  handleSelect(dateStates) {
    this.setState({dateStates});
  },

  render() {
    const stateDefinitions = {
      available: {
        color: '#ffffff',
        label: 'Available'
      },
      enquire: {
        color: '#ffd200',
        label: 'enquire'
      },
      conflict: {
        color: '#63FF7F',
        label: 'conflict'
      },
    };
    const dateStates = this.state.dateStates

    return (
      <main>
        <Header />

        <div className="content">
          <div className="left">
            <DateRangePicker
              firstOfWeek={1}
              numberOfCalendars={3}
              selectionType='range'
              minimumDate={new Date()}
              maximumDate={moment().add(1, 'years').toDate()}
              stateDefinitions={stateDefinitions}
              defaultState="available"
              showLegend={false}
              onSelect={this.handleSelect}
              dateStates={dateStates}
              overlayDateRange={true}
            />
          </div>
          <div className="right">
            <div className="example">
              <select className="selector" defaultValue="custom" onChange={this.handleDate}>
                <option value="custom">Custom</option>
                <option value="today">Today</option>
                <option value="yesterday">Yesterday</option>
              </select>
            </div>
            <div className="example">
              <input type="text"
                     value={dateStates ? dateStates[0].range.start.format('LL') : ""}
                     readOnly={true}
                     placeholder="Start date"/>
              <input type="text"
                     value={dateStates ? dateStates[0].range.end.format('LL') : ""}
                     readOnly={true}
                     placeholder="End date" />
            </div>
            <p>Comparing to:</p>
            <div className="example">
              <select className="selector" defaultValue="custom">
                <option value="custom">Custom</option>
                <option value="none">None</option>
                <option value="previousDay">Previous day</option>
                <option value="previousWeek">Previous week</option>
                <option value="previousMonth">Previous month</option>
              </select>
            </div>
            <div className="example">
              <div className="example">
                <input type="text"
                       value={dateStates && dateStates[1] ? dateStates[1].range.start.format('LL') : ""}
                       readOnly={true}
                       placeholder="Start date"/>
                <input type="text"
                       value={dateStates && dateStates[1] ? dateStates[1].range.end.format('LL') : ""}
                       readOnly={true}
                       placeholder="End date" />
              </div>
              <div className="example">
                <select className="selector half" defaultValue="percent">
                  <option value="percent">%</option>
                  <option value="abs">abs</option>
                </select>
              </div>
            </div>

            <p>By:</p>
            <div className="example">
              <select className="selector half" defaultValue="day">
                <option value="day">Day</option>
                <option value="hour">Hour</option>
                <option value="week">Week</option>
                <option value="month">Month</option>
                <option value="quarter">Quarter</option>
                <option value="year">Year</option>
              </select>
            </div>

          </div>
        </div>

      </main>
    );
  },
});

export default Index;
