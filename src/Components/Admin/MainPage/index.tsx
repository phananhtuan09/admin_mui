import React from 'react';
import './MainPage.scss';
import CardImage from './CardImage';
interface ImageInfo {
  title: string;
  path: string;
  id: number | string;
  selected: boolean;
}
export default function MainPage() {
  const imageArr: ImageInfo[] = [
    {
      title: '',
      path: 'https://media.wired.com/photos/598e35fb99d76447c4eb1f28/master/pass/phonepicutres-TA.jpg',
      id: '1',
      selected: false,
    },
    {
      title: '',
      path: 'https://media.wired.com/photos/598e35fb99d76447c4eb1f28/master/pass/phonepicutres-TA.jpg',
      id: '2',
      selected: false,
    },
    {
      title: '',
      path: 'https://media.wired.com/photos/598e35fb99d76447c4eb1f28/master/pass/phonepicutres-TA.jpg',
      id: '3',
      selected: false,
    },
    {
      title: '',
      path: 'https://media.wired.com/photos/598e35fb99d76447c4eb1f28/master/pass/phonepicutres-TA.jpg',
      id: '4',
      selected: false,
    },
    {
      title: '',
      path: 'https://media.wired.com/photos/598e35fb99d76447c4eb1f28/master/pass/phonepicutres-TA.jpg',
      id: '5',
      selected: false,
    },
    {
      title: '',
      path: 'https://media.wired.com/photos/598e35fb99d76447c4eb1f28/master/pass/phonepicutres-TA.jpg',
      id: '6',
      selected: false,
    },
    {
      title: '',
      path: 'https://media.wired.com/photos/598e35fb99d76447c4eb1f28/master/pass/phonepicutres-TA.jpg',
      id: '7',
      selected: false,
    },
    {
      title: '',
      path: 'https://media.wired.com/photos/598e35fb99d76447c4eb1f28/master/pass/phonepicutres-TA.jpg',
      id: '8',
      selected: false,
    },
    {
      title: '',
      path: 'https://media.wired.com/photos/598e35fb99d76447c4eb1f28/master/pass/phonepicutres-TA.jpg',
      id: '9',
      selected: false,
    },
    {
      title: '',
      path: 'https://media.wired.com/photos/598e35fb99d76447c4eb1f28/master/pass/phonepicutres-TA.jpg',
      id: '10',
      selected: false,
    },
    {
      title: '',
      path: 'https://media.wired.com/photos/598e35fb99d76447c4eb1f28/master/pass/phonepicutres-TA.jpg',
      id: '11',
      selected: false,
    },
    {
      title: '',
      path: 'https://media.wired.com/photos/598e35fb99d76447c4eb1f28/master/pass/phonepicutres-TA.jpg',
      id: '12',
      selected: false,
    },
    {
      title: '',
      path: 'https://media.wired.com/photos/598e35fb99d76447c4eb1f28/master/pass/phonepicutres-TA.jpg',
      id: '13',
      selected: false,
    },
    {
      title: '',
      path: 'https://media.wired.com/photos/598e35fb99d76447c4eb1f28/master/pass/phonepicutres-TA.jpg',
      id: '14',
      selected: false,
    },
  ];
  return (
    <div className="mainPage">
      <h2 className="mainPage-title">Failure Case Data</h2>
      <div className="selectAll">
        <div className="selectAll-info">
          <input className="selectAll-checkbox" type="checkbox" />
          <span className="selectAll-title">Select All</span>
          <span className="selectAll-amount">39</span>
        </div>
        <button className="selectAll-btn">ADD TO TRAINING SET</button>
      </div>
      <div className="mainPage-listImg">
        {imageArr.map((image) => (
          <CardImage key={image.id} {...image} />
        ))}
      </div>
    </div>
  );
}
