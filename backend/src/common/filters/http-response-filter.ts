export class HttpResponseFilter {
  constructor(
    private readonly message: string | object,
    private readonly status: number,
  ) {
    this.message = message;
    this.status = status;
  }

  get responseMessage() {
    if (typeof this.message === 'string') {
      return this.message;
    }

    if (
      this.message &&
      typeof this.message === 'object' &&
      'message' in this.message
    ) {
      const msg = (this.message as Error).message;
      return Array.isArray(msg) ? msg.join(', ') : msg;
    }
    return 'Unexpected error';
  }

  get response() {
    return {
      Response: {
        status: this.status,
        message: this.responseMessage,
      },
    };
  }
}
