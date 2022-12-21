class Logger {
  info(...data: any[]) {
    console.log(data);
  }
}

class Client {
  private readonly _log: Logger;

  constructor(apiUrl: string, apiToken: string) {
    this._log = new Logger();
  }

  public get log() {
    return this._log;
  }

  subscribe(accessory: string, token: string, onMessage: (msg: any) => void) {
  }
}

export default Client;
