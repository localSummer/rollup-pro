import * as React from 'react';
import classNames from "classnames";
import './index.less';

/*
 * speed
 * progressStatus
 * template
 * className
 */

interface StyleType {
  width: string,
  transition: string
}

interface PropsType {
  readonly children?: React.ReactNode,
  option: {
    readonly speed?: number,
    readonly progressStatus: string,
    readonly template?: React.ReactNode,
    readonly className?: string,
  }
}

interface Timers {
  timeout: any,
  interval: any
}

let styles: StyleType = {
  width: '100%',
  transition: 'none 0s',
};

//默认值
let defaultProps = {
  option: {
    speed: 200,
    progressStatus: '',
    template: <img alt="进度条" className="progress-bar" src={require('./images/loadingbar.png')} />
  }
}

const getMaxNum = (times: number = 1): number => {
  if (times === 1) {
    return 0.3;
  } else if (times === 2) {
    return 0.6;
  } else if (times === 3) {
    return 0.9;
  }
  return 0.994;
};

const getPercent = (w: number, times: number): number => Math.random() * (getMaxNum(times) - w) + w;

const ProgressLoading = (props: PropsType = defaultProps): React.ReactNode => {
  let [timer, setTimer] = React.useState<Timers>({
    timeout: null,
    interval: null,
  });
  let [done, setDone] = React.useState<boolean>(false);
  let [show, setShow] = React.useState<boolean>(false);
  let [loadingW, setLoadingW] = React.useState<number>(0);

  let clearTime = (): void => {
    clearTimeout(timer.interval);
    clearTimeout(timer.timeout);
  };

  let handleStart = (speed: number): void => {
    clearTime();
    done && setDone(false);
    !show && setShow(true);
    let num: number = loadingW;
    let times: number = 0;
    let a = setInterval(() => {
      times++;
      num = getPercent(num, times);
      setLoadingW(num);
    }, speed);
    setTimer({ ...timer, interval: a });
  }

  let handleDone = (): void => {
    !done && setDone(true);
    setLoadingW(0);
  }

  let handleEnd = (speed: number): void => {
    !done && setDone(true);
    setLoadingW(0);
    clearTime();
    let a = setTimeout(() => {
      show && setShow(false);
      done && setDone(false);
    }, speed + 100);
    setTimer({ ...timer, timeout: a });
  }

  React.useEffect(() => {
    let { progressStatus, speed } = props.option;
    switch (progressStatus) {
      case 'start':
        handleStart(speed!);
        break;
      case 'end':
        handleEnd(speed!);
        break;
      case 'done':
        handleDone();
        break;
      default:
        clearTime();
        setLoadingW(0);
        done && setDone(false);
        show && setShow(false);
        break;
    }
    return () => {
      clearTime();
    };
  }, [props.option.progressStatus]);

  if (done) {
    styles = {
      width: '100%',
      transition: 'none 0s',
    };
  } else if (show) {
    styles = {
      width: `${loadingW * 100}%`,
      transition: `width ${props.option.speed}ms linear 0s`,
    };
  }
  return (
    <div className={classNames(`progress-loading-wrap ${props.option.className}`)}>
      <div className={classNames('progress-loading', { hide: !show })} style={styles}>
        {props.option.template}
      </div>
      {props.children}
    </div>
  );
};


export default ProgressLoading;
