export type Publication = {
  id: string
  title: string
  authors: string[]
  venue: string
  publisher: string
  location: string
  year: string
  doi: string
  doiUrl: string
  abstract: string
  keywords: string[]
  datasetUrl?: string
  bibtex: string
}

export const publications: Publication[] = [
  {
    id: 'siyo-brain-tumor',
    title: 'Brain Tumor Detection and Segmentation using SAM Integrated YOLOv9 Scheme',
    authors: ['Mridul Mayankeyshwar', 'Lookinder Kumar', 'Dev Yadav', 'Mamata P. Wagh'],
    venue: '2024 IEEE 1st International Conference on Advances in Signal Processing, Power, Communication, and Computing (ASPCC)',
    publisher: 'IEEE',
    location: 'Bhubaneswar, India',
    year: '2024',
    doi: '10.1109/ASPCC62191.2024.10881978',
    doiUrl: 'https://doi.org/10.1109/ASPCC62191.2024.10881978',
    abstract: 'Proposes SIYO (SAM Integrated YOLOv9), integrating Meta\'s Segment Anything Model (SAM) with YOLOv9 for brain tumour detection and segmentation on MRI images. Evaluated on Br35H dataset (800 MRI images across training, validation, and test sets). Achieves mAP@0.5 = 0.947, overall accuracy = 0.94. YOLOv9 localises and detects tumours; SAM segments precisely using zero-shot generalisation. Data augmentation (rotation, scaling, flipping, noise) applied exclusively to training data.',
    keywords: ['Computer Vision', 'Medical Imaging', 'YOLOv9', 'Segment Anything Model', 'Brain Tumour Detection', 'Deep Learning'],
    bibtex: `@inproceedings{mayankeyshwar2024siyo,
  title={Brain Tumor Detection and Segmentation using SAM Integrated YOLOv9 Scheme},
  author={Mayankeyshwar, Mridul and Kumar, Lookinder and Yadav, Dev and Wagh, Mamata P.},
  booktitle={2024 IEEE 1st International Conference on Advances in Signal Processing, Power, Communication, and Computing (ASPCC)},
  year={2024},
  organization={IEEE},
  doi={10.1109/ASPCC62191.2024.10881978}
}`,
  },
  {
    id: 'tomatodoc-disease',
    title: 'Deep Learning-Based Tomato Plant Disease Detection using TomatoDoc Dataset: Agricultural Applications',
    authors: ['Ahmad Ashraf Zargar', 'Mridul Mayankeyshwar', 'Lookinder Kumar', 'Debendra Muduli'],
    venue: 'Computational Intelligence in Pattern Recognition (CIPR 2024), Lecture Notes in Networks and Systems, vol. 1153',
    publisher: 'Springer, Singapore',
    location: 'Singapore',
    year: '2024',
    doi: '10.1007/978-981-97-8093-8_9',
    doiUrl: 'https://doi.org/10.1007/978-981-97-8093-8_9',
    datasetUrl: 'https://www.kaggle.com/datasets/ahmadzargar/tomatodoc',
    abstract: 'Introduces the TomatoDoc segmented dataset of 10,000 tomato leaf images across 10 disease classes (1,000 images each, 256×256px). K-means clustering isolates infected regions; MobileNet-V3 with a custom 3-layer dense head classifies disease. Advances agricultural diagnostics for smallholder farmers through smartphone-deployable disease detection. Bridges precision agriculture and accessible deep learning tools.',
    keywords: ['MobileNet-V3', 'K-Means Clustering', 'Agricultural AI', 'Plant Disease Detection', 'TomatoDoc Dataset', 'Deep Learning'],
    bibtex: `@inproceedings{zargar2024tomatodoc,
  title={Deep Learning-Based Tomato Plant Disease Detection using TomatoDoc Dataset: Agricultural Applications},
  author={Zargar, Ahmad Ashraf and Mayankeyshwar, Mridul and Kumar, Lookinder and Muduli, Debendra},
  booktitle={Computational Intelligence in Pattern Recognition (CIPR 2024)},
  series={Lecture Notes in Networks and Systems},
  volume={1153},
  publisher={Springer, Singapore},
  year={2024},
  doi={10.1007/978-981-97-8093-8_9}
}`,
  },
]
