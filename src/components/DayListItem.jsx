import React from "react";
import classNames from "classnames";
import 'components/DayListItem.scss';

export default function DayListItem(props) {
  const { name, spots, selected, setDay } = props;

  const formatSpots = () => {
    if (spots === 0) {
      return 'no spots remaining'
    }

    if (spots === 1) {
      return `${spots} spot remaining`
    }

    return `${spots} spots remaining`
  };

  let dayClass = classNames('day-list__item', {
    'day-list__item--selected': selected,
    'day-list__item--full': !spots
  });

  return (
		<li className={dayClass} onClick={() => setDay(name)} data-testid='day'>
			<h2 className='text--regular'>{name}</h2>
			<h2 className='text--light'>{formatSpots()}</h2>
		</li>
	);
};