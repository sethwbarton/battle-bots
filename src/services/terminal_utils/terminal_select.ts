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

const getCursorPos = (): Promise<{ x: number; y: number }> =>
  new Promise((resolve) => {
    const termcodes = { cursorGetPosition: '\u001b[6n' }

    process.stdin.setEncoding('utf8')
    process.stdin.setRawMode(true)

    const readfx = function () {
      const buf = process.stdin.read()
      const str = JSON.stringify(buf) // "\u001b[9;1R"
      const regex = /\[(.*)/g
      // @ts-ignore
      const xy = regex.exec(str)[0].replace(/\[|R"/g, '').split(';')
      const pos = { y: parseInt(xy[0]), x: parseInt(xy[1]) }
      process.stdin.setRawMode(false)
      resolve(pos)
    }

    process.stdin.once('readable', readfx)
    process.stdout.write(termcodes.cursorGetPosition)
  })

export class TerminalSelect {
  question: string
  options: string[]
  highlightColor: TerminalColors = TerminalColors.BLUE
  currentSelectionIndex: number
  cursorStartLocation: { x: number; y: number } = { x: 0, y: 0 }
  inputPutPromiseResolver: (value: string | PromiseLike<string>) => void = (
    value
  ) => {
    return
  }

  /**
   * Must have at least one item in options. Use termianlSelect.waitForInput() after
   * initialization to get a response from the user.
   * @param question
   * @param options
   */
  constructor({ question, options }: SelectInitOptions) {
    this.question = question ? question : ''
    this.options = options
    this.currentSelectionIndex = 0
  }

  public async waitForInput(): Promise<string> {
    this.cursorStartLocation = await getCursorPos()

    stdin.setRawMode(true)
    stdin.setEncoding('utf8')

    this.draw()
    return new Promise((resolve) => {
      this.inputPutPromiseResolver = resolve
      stdin.on('data', this.stdinListener)
    })
  }

  private stdinListener = (data: boolean) => {
    this.handleUserInput(String(data), this.inputPutPromiseResolver)
  }

  private handleUserInput(
    input: string,
    resolve: (value: string | PromiseLike<string>) => void
  ): void {
    if (input === KeystrokeCodes.ENTER) {
      resolve(this.options[this.currentSelectionIndex])
      stdin.removeAllListeners()
    }
    if (input === KeystrokeCodes.UP_ARROW) {
      this.onUpArrow()
    }
    if (input === KeystrokeCodes.DOWN_ARROW) {
      this.onDownArrow()
    }
  }

  private draw() {
    // Makes sure we draw over the original question rather than making a new one on the terminal.
    // I don't know why it has to be x - 1 and y - 1, but it draws incorrectly otherwise
    rdl.cursorTo(
      process.stdout,
      this.cursorStartLocation.x - 1,
      this.cursorStartLocation.y - 1
    )
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
