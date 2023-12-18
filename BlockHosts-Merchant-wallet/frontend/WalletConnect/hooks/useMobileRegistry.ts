import * as React from "react";

import { WalletService } from "../types";

type State = {
  readonly data: readonly WalletService[]; // TODO
  readonly error?: Error;
  readonly loading: boolean;
};

const defaultState: State = Object.freeze({
  data: [],
  error: undefined,
  loading: true,
});

export default function useMobileRegistry(): State {
  const [state, setState] = React.useState<State>(defaultState);

  React.useEffect(() => {
    (async () => {
      try {
        const result = await fetch("https://registry.walletconnect.org/data/wallets.json");
        const data = await result.json();
        const xData = Object.values(data).filter(item => item.id === 'c57ca95b47569778a828d19178114f4db188b89b763c899ba0be274e97267d96')

        setState({
          data: xData as readonly WalletService[],
          error: undefined,
          loading: false,
        });
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error);
        setState({ ...defaultState, error: error as any, loading: false });
      }
    })();
  }, [setState]);

  return state;
}
