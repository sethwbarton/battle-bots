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

export const HIDE_CURSOR_ESCAPE_CODE = '\x1B[?25l'
export const SHOW_CURSOR_ESCAPE_CODE = '\x1B[?25h'

export const getCursorPos = (): Promise<{ x: number; y: number }> =>
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
