import React from "react";
import makeObservable from "./MakeObservable";

const embroideryResult = makeObservable({ file: "", gcode: [], toast: "" });

const useEmbroideryResult = () => {
  const [result, setResult] = React.useState(embroideryResult.get());

  React.useEffect(() => {
    return embroideryResult.subscribe(setResult);
  }, []);

  const actions = React.useMemo(() => {
    return {
      setFile: (file: string) => embroideryResult.set({ ...result, file }),
      setGcode: (gcode: []) => embroideryResult.set({ ...result, gcode }),
      setToast: (toast: string) => embroideryResult.set({ ...result, toast }),
      set: (file: string, gcode: [], toast: string) => embroideryResult.set({file, gcode, toast})
    }
  }, [result])

  return {
    state: result,
    actions
  }
}

export default useEmbroideryResult;