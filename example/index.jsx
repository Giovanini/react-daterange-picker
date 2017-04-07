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
          <div className="example">
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
            <div>
              <input type="text"
                 value={dateStates ? dateStates[0].range.start.format('LL') : ""}
                 readOnly={true}
                 placeholder="Start date"/>
              <input type="text"
                 value={dateStates ? dateStates[0].range.end.format('LL') : ""}
                 readOnly={true}
                 placeholder="End date" />
            </div>
            <div>
              <input type="text"
                 value={dateStates && dateStates[1] ? dateStates[1].range.start.format('LL') : ""}
                 readOnly={true}
                 placeholder="Start date"/>
              <input type="text"
                 value={dateStates && dateStates[1] ? dateStates[1].range.end.format('LL') : ""}
                 readOnly={true}
                 placeholder="End date" />
            </div>
          </div>

        </div>
      </main>
    );
  },
});

export default Index;
