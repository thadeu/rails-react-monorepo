import Lodash from 'lodash'

export class UploadService {
  URL: string = import.meta.env.VITE_API_URL
  PATH: string = "api/v1/uploads/csv"
  TOKEN: string = import.meta.env.VITE_API_SECRET_KEY

  async sendRequest(body: any, onProgress?: (percent: number) => void): Promise<any> {
    const xhr = new XMLHttpRequest();

    const data = JSON.stringify(body);
    const finalUrl = `${this.URL}/${this.PATH}`

    xhr.open("POST", finalUrl);

    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader('Authorization', `Token token=${this.TOKEN}`)

    xhr.onprogress = (event) => {
      if (event.lengthComputable) {
        const percent = (event.loaded / event.total) * 100;

        onProgress && onProgress(percent)
      }
    };

    xhr.send(data);

    return new Promise((resolve, reject) => {
      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          resolve(JSON.parse(xhr.responseText));
        } else {
          reject(xhr.responseText);
        }
      };

      xhr.onerror = () => {
        reject(xhr.responseText);
      };
    });
  }
}

type CsvParsedType = {
  header: string[]
  rows: string[][]
}

type CsvOptionsType = {
  col_separator: string
}

export class SimpleWebCSV {
  csv: string = ''
  options: CsvOptionsType = { col_separator: ';' }

  constructor(csv: string, options = {}) {
    this.csv = csv
    this.options = { col_separator: ';', ...options }
  }

  parse(): CsvParsedType {
    const splitted = this.csv.split('\n')
    const rows = splitted.map(row => row.split(this.options.col_separator))
    const header = rows.splice(0, 1)[0]

    return { header, rows }
  }

  create(header: string[], rows: any): string {
    return SimpleWebCSV.create(header, rows)
  }

  static create(header: string[], rows: any): string {
    if (Lodash.isEmpty(rows)) {
      return ''
    }

    let csv = header.join(';')

    rows.forEach((row: any) => {
      csv += `\n${row.join(';')}`
    })

    return csv.replace(/\n$/, '')
  }
}

export function readCsvFromFileSystem(file: File) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()

    reader.onload = () => resolve(reader.result)
    reader.onerror = error => reject(error)
    reader.readAsText(file)
  })
}