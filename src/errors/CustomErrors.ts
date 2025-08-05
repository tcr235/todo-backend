export class InvalidInputError extends Error {
  constructor(message = "INVALID_INPUT") {
    super(message);
    this.name = "InvalidInputError";
  }
}

export class DuplicatedEmailError extends Error {
  constructor(message = "DUPLICATED_EMAIL") {
    super(message);
    this.name = "DuplicatedEmailError";
  }
}

export class InternalError extends Error {
  constructor(message = "INTERNAL_ERROR") {
    super(message);
    this.name = "InternalError";
  }
}
