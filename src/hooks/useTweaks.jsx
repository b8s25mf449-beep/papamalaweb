// ─── useTweaks ────────────────────────────────────────────────────────────────
// Hook: maneja el estado del panel de tweaks.
// Acepta setTweak('key', value) o setTweak({ key: value }).

(function () {
  const { useState, useCallback } = React;

  function useTweaks(defaults) {
    const [values, setValues] = useState(defaults);

    const setTweak = useCallback((keyOrEdits, val) => {
      const edits =
        typeof keyOrEdits === "object" && keyOrEdits !== null
          ? keyOrEdits
          : { [keyOrEdits]: val };
      setValues((prev) => ({ ...prev, ...edits }));
    }, []);

    return [values, setTweak];
  }

  window.useTweaks = useTweaks;
})();
