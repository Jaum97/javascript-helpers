export declare type IIntervalReturn = [
	() => void,
	() => void,
	number
]

export const useInterval = (
	action: () => void,
	time = 1000
): IIntervalReturn => {
	let id = 0

	let start = () => {		
		id = setInterval(action, time)
	}

	const stop = () => {
		clearInterval(id)
	}

	return [start, stop, id]
}

export const useDelay = (
	callback: () => void,
	delay = 5000,
	checkTime = 1000,
) => {
	let id = 0
	let s = 0

	const check = () => {
		if(!(Date.now() - s > delay)) return

		callback()
		stop()
	}

	let start = () => {	
		s = Date.now()	
		id = setInterval(check, checkTime)
	}

	const stop = () => {
		clearInterval(id)
	}

	return [start]
}

//https://itnext.io/how-to-create-react-custom-hooks-for-data-fetching-with-useeffect-74c5dc47000a
const useFetch = (url) => {
  const [data, setData] = useState(null);
  useEffect(() => {
    let mounted = true;
    (async () => {
      const res = await fetch(url);
      const data = await res.json();
      if (mounted) setData(data);
    })();
    const cleanup = () => { mounted = false; };
    return cleanup;
  }, [url]);
  return data;
};

const useTypedSelector<K extends keyof IStore>(props: Array<K>, equalityFn) {
	const getProps = pickKeys(props)
	
	return useSelector<IStore, Pick<IStore, K>>(getProps, equalityFn)
}
