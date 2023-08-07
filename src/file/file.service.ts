import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs';
import * as uuid from 'uuid';

export enum FileType {
  IMAGE = 'image',
}

@Injectable()
export class FileService {
  createFile(type: FileType, file) {
    try {
      const fileExtencion = file.originalname.split('.').pop();
      const fileName = uuid.v4() + '.' + fileExtencion;
      const filePath = path.resolve(__dirname, '..', '..', 'uploads', type);
      if (!fs.existsSync(filePath)) {
        fs.mkdirSync(filePath, { recursive: true });
      }
      fs.writeFileSync(path.resolve(filePath, fileName), file.buffer);
      return type + '/' + fileName;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  deleteFile(filePath: string) {
    try {
      const fullPath = path.resolve(__dirname, '..', '..', 'uploads', filePath);
      fs.unlinkSync(fullPath);
    } catch (error) {
      throw new HttpException(
        'Ошибка при удалении файла',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
