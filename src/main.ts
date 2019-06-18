import * as path from 'path';
import { AuthConfig } from 'node-sp-auth-config';

import { Upload } from '.';

const args = process.argv.slice(2);

if (args.length < 2) {
  throw new Error('Expected at least 2 arguments: node main.js "Distant Folder" file1 [file2] [file3...]');
}

const folderUrl = args[0];

const files = args.slice(1);

files
  .map(filePath => path.join(filePath))
  .forEach((filePath) => {
    new AuthConfig().getContext()
      .then(context => {
        const upload = new Upload(context);
        const folderRelativeUrl = `/${context.siteUrl.split('/').slice(3).join('/')}/${folderUrl}`;

        return upload.addChunked(folderRelativeUrl, filePath);
      })
      .then(_ => {
        console.log('Done');
      })
      .catch(console.log);
  });
