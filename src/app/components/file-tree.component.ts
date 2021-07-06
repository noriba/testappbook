import {Component, OnInit} from '@angular/core';
import {BreadcrumbService} from '../services/breadcrumb.service';
import {TreeNode} from 'primeng/api';

@Component({
  template: `
    <p-tree [value]="files"></p-tree>
  `
})
export class FileTreeComponent implements OnInit {
  files: TreeNode[];

  constructor(private breadcrumb: BreadcrumbService) {
  }

  reducePath = (nodes: TreeNode[], path: string) => {
    const split = path.split('/');

    if (split.length === 1) {
      return [
        ...nodes,
        {
          label: split[0],
          icon: 'fa-file-o'
        }
      ];
    }

    if (nodes.findIndex(n => n.label === split[0]) === -1) {
      return [
        ...nodes,
        {
          label: split[0],
          icon: 'fa-folder',
          children: this.reducePath([], split.slice(1).join('/'))
        }
      ];
    }

    return nodes.map(n => {
      if (n.label !== split[0]) {
        return n;
      }

      return Object.assign({}, n, {
        children: this.reducePath(n.children, split.slice(1).join('/'))
      });
    });
  };

  ngOnInit() {
    const f = [
      'folderA/file1.txt',
      'folderA/file1.txt',
      'folderA/folderB/file1.txt',
      'folderA/folderB/file2.txt',
      'folderC/file1.txt'
    ];

    this.files = f.reduce(this.reducePath, []);
  }
}
