import rdl from 'readline'
const stdout = process.stdout
const stdin = process.stdin
const stderr = process.stderr

export interface SelectInitOptions {
  question?: string
  options: string[]
}

export const HIDE_CURSOR_ESCAPE_CODE = '\x1B[?25l'
export const SHOW_CURSOR_ESCAPE_CODE = '\x1B[?25h'

export enum KeystrokeCodes {
  CTRL_D = '\u0004',
  CTRL_C = '\u0003',
  UP_ARROW = '\u001b[A',
  DOWN_ARROW = '\u001b[B',
  ENTER = '\r',
  NEWLINE = '\n',
}

export enum TerminalColors {
  BLACK = '\u001b[30m',
  RED = '\u001b[31m',
  GREEN = '\u001b[32m',
  YELLOW = '\u001b[33m',
  BLUE = '\u001b[34m',
  MAGENTA = '\u001b[35m',
  CYAN = '\u001b[36m',
  WHITE = '\u001b[37m',
  RESET = '\u001b[0m',
}

export class TerminalSelect {
  question: string
  options: string[]
  highlightColor: TerminalColors = TerminalColors.BLUE
  currentSelectionIndex: number

  /**
   * Must have at least one item in options
   * @param question
   * @param options
   */
  constructor({ question, options }: SelectInitOptions) {
    this.question = question ? question : ''
    this.options = options
    this.currentSelectionIndex = 0
  }

  public async waitForInput(): Promise<string> {
    // without this, we would only get streams once enter is pressed
    stdin.setRawMode(true)

    // i don't want binary, do you?
    stdin.setEncoding('utf8')

    this.draw()
    return new Promise((resolve) => {
      stdin.on('data', (data) => {
        this.handleUserInput(String(data), resolve)
      })
    })
  }

  private handleUserInput(
    input: string,
    resolve: (value: string | PromiseLike<string>) => void
  ): void {
    if (input === KeystrokeCodes.ENTER) {
      resolve(this.options[this.currentSelectionIndex])
    }
    if (input === KeystrokeCodes.UP_ARROW) {
      this.onUpArrow()
    }
    if (input === KeystrokeCodes.DOWN_ARROW) {
      this.onDownArrow()
    }
  }

  private draw() {
    if (this.question) {
      process.stdout.write(this.question + '\n')
    }
    this.options.forEach((option, index) => {
      if (index === this.currentSelectionIndex) {
        process.stdout.write(
          '> ' + this.highlightColor + option + TerminalColors.RESET + '\n'
        )
      } else {
        process.stdout.write('> ' + option + '\n')
      }
    })
  }

  private onDownArrow() {
    if (this.currentSelectionIndex - 1 >= 0) {
      this.currentSelectionIndex -= 1
    } else {
      this.currentSelectionIndex = this.options.length - 1
    }
    this.draw()
  }

  private onUpArrow() {
    if (this.currentSelectionIndex + 1 <= this.options.length - 1) {
      this.currentSelectionIndex += 1
    } else {
      this.currentSelectionIndex = 0
    }
    this.draw()
  }
}
