import { Injectable } from '@angular/core';

export interface GuideItem {
  id: string;
  name: string;
  document: string;
  url: string;
}

const GUIDES: GuideItem[] = [
  {
    id: 'getting-started',
    document: 'assets/docs/guides/getting-started.html',
    url: 'doc/guides/getting-started',
    name: 'Getting Started'
  },
  {
    id: 'generate-api-key',
    document: 'assets/docs/guides/generate-api-key.html',
    url: 'doc/guides/generate-api-key',
    name: 'Generating an API Key'
  },
  {
    id: 'troubleshooting',
    document: 'assets/docs/guides/troubleshooting.html',
    url: 'doc/guides/troubleshooting',
    name: 'Troubleshooting'
  }
];

@Injectable()
export class GuideItemsService {
  getAllItems(): GuideItem[] {
    return this.getGuideItems();
  }
  getGuideItems(): GuideItem[] {
    return GUIDES;
  }
  getGuideItemById(id: string): GuideItem {
    return GUIDES.find(i => i.id === id);
  }
}
