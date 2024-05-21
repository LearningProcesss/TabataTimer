import { useRef } from "react";
import { useLoaderData } from "react-router-dom";
import { useCountdown, CountdownCircleTimer } from 'react-countdown-circle-timer';
import { Breadcrumbs, Anchor, Center, Container } from '@mantine/core';
import { useInterval } from '@mantine/hooks';
import { useWorkoutInterface } from "../hooks/useWorkoutInterface";
import Slider from "react-slick";

function WorkoutPlayer() {

  const { workout } = useLoaderData();

  // const [seconds, setSeconds] = useState(0);

  // useInterval(() => );

  const [workoutTotal, secondsAsHumanReadable, workoutAsQueue] = useWorkoutInterface();

  const queue = workoutAsQueue(workout);

  console.log('queue', JSON.stringify(queue));
  Array.from({ length: queue.tail })
  .map((i, index) =>console.log('queue - elementAt', queue.elementAt(index)));

  let sliderRef = useRef(null);

  const next = () => {
    sliderRef.slickNext();
  };
  const previous = () => {
    sliderRef.slickPrev();
  };

  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  const items = [
    { title: 'TabataTimer', href: '/' },
    { title: 'Workouts', href: '/' },
    { title: workout?.name, href: `/workouts/${workout.id}` }].map((item, index) => (
      <Anchor href={item.href} key={index}>
        {item.title}
      </Anchor>
    ));

  console.log('WorkoutPlayer', workout);

  return (
    <>
      <Breadcrumbs separator="→" separatorMargin="md" mt="xs">
        {items}
      </Breadcrumbs>
      {/* <Center> */}
        <Slider
          ref={slider => {
            sliderRef = slider;
          }}
          {...settings}
        >
          {
            Array.from({ length: queue.tail })
                 .map((_, index) => <CountdownCircleTimer
                  key={index}
                  duration={queue.elementAt(index).duration}
                  colors={['#004777', '#F7B801', '#A30000', '#A30000']}
                  colorsTime={[7, 5, 2, 0]}
                  onComplete={() => [true, queue.dequeue()]}
                >
                  {/* {RenderTime} */}
                  {
                    ({remainingTime}) => <RenderTime remainingTime={remainingTime} message={queue.elementAt(index).message} />
                  }
                </CountdownCircleTimer>)
          }
        </Slider>
      {/* </Center> */}
    </>
  )
}

const RenderTime = ({ remainingTime, message }) => {
  return (
    <div className="timer">
      <div className="text" style={{ textTransform: 'uppercase' }}><b>{message}</b></div>
      <div className="value">{remainingTime}</div>
      <div className="text">seconds</div>
      {/* <div className="text">{elapsedTime}</div> */}
    </div>
  );
}

const MyComponent = ({}) => {

}

export default WorkoutPlayer