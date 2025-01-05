# Data

Note that all data for download here is identically featured on [our NITRC page](https://www.nitrc.org/projects/yale_atlas_2021/). 

## Repository structure

The data repository is structured as follows:

- `/Connectome`: contains the processed WM connectomes for 1065 healthy subjects in Yale Brain Atlas space and summary statistics, i.e., pairwise structural connectivity (SC) between parcels averaged across all subjects for 12 different SC metrics. Specifically, this folder contains...

  - Number of white matter streamlines and white matter length between parcels for each subject
  
  -	Pairwise structural connectivity between parcels averaged across all subjects for 12 different SC metrics
  
  -	3D mesh

- `/CorticalThickness`: contains cortical thickness data for 200 healthy subjects in Yale Brain Atlas space and summary statistics, i.e., an averaged cortical thickness map. Specifically, this folder contains...

  - Cortical thickness values (mm) between parcels averaged for each subject
  
  -	Mean cortical thickness values (mm) between parcels averaged across all subjects

- `/ParcelQuery`: contains the data for ParcelQuery, which is the fMRI activation database of NeuroQuery (Dockès et al., *eLife* (2020)) translated into Yale Brain Atlas space for 334 function-specific terms. Specifically, this folder contains...

  - fMRI activation z-score values for 334 specific functions for each parcel

- `/Parcelsynth`: contains the data for Parcelsynth, which is the fMRI activation database of Neurosynth (Yarkoni et al., *Nat Methods* (2011)) translated into Yale Brain Atlas space for 334 function-specific terms. Specifically, this folder contains...

  - fMRI activation z-score values for 1334 terms (all terms unmodified from Neurosynth) for each parcel
  
  -	fMRI activation z-score values for 334 specific functions for each parcel
  
  -	Publications that report activations for each parcel
  
  -	Coordinates of reported activations for each parcel

- `/YBA_690parcels`: contains files needed for the 690-parcel version of Yale Brain Atlas. This version excludes the 6 parcels in the corpus callosum. Specifically, this folder contains...

  - Coordinates & indices

  -	Parcel dictionary

  -	3D mesh


- `/YBA_696parcels`: contains files needed for the 696-parcel version of Yale Brain Atlas. This version includes the 6 parcels in the corpus callosum. Specifically, this folder contains...

  - Coordinates & indices

  -	Parcel dictionary

  -	3D mesh

- `/rsfMRI`: contains the resting-state fMRI (rsfMRI) pairwise correlation connectivity matrices for 34 healthy adult subjects. Specifically, this folder contains...

  - rsfMRI pairwise Pearson correlation coefficients between parcels for each subject

  -	rsfMRI pairwise Pearson correlation coefficients between parcels averaged across all subjects

