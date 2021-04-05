---
title: Imagenet SOTA Models 20210331
categories: [Image]
comments: true
---


* 성능 향상 기본 방법
> 모델 더 깊게   
> balance data / augment   
> image resolution 더 크게   

* Imagenet SOTA      
<a href="https://paperswithcode.com/sota/image-classification-on-imagenet">https://paperswithcode.com/sota/image-classification-on-imagenet</a>

* pytorch image models   
<a href="https://github.com/rwightman/pytorch-image-models">https://github.com/rwightman/pytorch-image-models</a>

----------------------
* Imagenet SOTA 20210331    
RANK	MODEL	TOP1ACCU TOP5 ACCU PARAMS EXTRA DATA	paper YEAR   
1 <mark style='background-color: #ffd33d'>Meta Pseudo Labels(EfficientNet-L2)</mark>        90.2%	98.8%	480M	O  google Meta Pseudo Labels 2021   
2 <mark style='background-color: #ffd33d'>Meta Pseudo Labels(EfficientNet-B6-Wide)</mark> 90%	98.7%	390M	O  google Meta Pseudo Labels 2021   
3 <mark style='background-color: #ffd33d'>NFNet-F4+</mark>                                        89.2%	-	527M	O  deepmind High-Performance Large-Scale Image Recognition Without Normalization 2021   
4 <mark style='background-color: #ffd33d'>ALIGN(EfficientNet-L2)</mark>                          88.64%	98.67%	480M	O  google Scaling Up Visual and Vision-Language Representation Learning With Noisy Text Supervision 2021   
5 <mark style='background-color: #ffd33d'>EfficientNet-L2-475(SAM)</mark>                      88.61%		480M	O  google Sharpness-Aware Minimization for Efficiently Improving Generalization 2020   
6 <mark style='background-color: #ffd33d'>ViT-H/14</mark>                                          88.55%		632M	O  google An Image is Worth 16x16 Words: Transformers for Image Recognition at Scale 2020   
7 <mark style='background-color: #ffd33d'>FixEfficientNet-L2</mark>                               88.5%	98.7%	480M	O facebook Fixing the train-test resolution discrepancy: FixEfficientNet 2020   
8 <mark style='background-color: #ffd33d'>NoisyStudent(EfficientNet-L2)</mark>                88.4%	98.7%	480M     O google Self-training with Noisy Student improves ImageNet classification 2020   
9 <mark style='background-color: #ffd33d'>ViT-L/16</mark>                                           87.76%		307M	O  google An Image is Worth 16x16 Words: Transformers for Image Recognition at Scale 2020   
10 <mark style='background-color: #ffd33d'>BiT-L(ResNet)</mark>                                   87.54%	98.46%	  -         O  google Big Transfer (BiT): General Visual Representation Learning 2019   
11 <mark style='background-color: #ffd33d'>FixEfficientNet-B7</mark>                               87.1%	98.2%	66M	O   
12 <mark style='background-color: #ffd33d'>NoisyStudent(EfficientNet-B7)</mark>      86.9%        98.1%	            66M      O              
13 <mark style='background-color: #ffd33d'>FixEfficientNet-B6</mark>                               86.7%	98.0%	43M	O   
14 <mark style='background-color: #ffd33d'>NFNet-F6 w/ SAM</mark>                              86.5%	97.9%	438.4M	X   
15 <mark style='background-color: #ffd33d'>FixResNeXt-101 32x48d</mark>                        86.4%	98.0%	829M	O   
16 <mark style='background-color: #ffd33d'>NoisyStudent(EfficientNet-B6)</mark>                86.4%	97.9%	43M	O   
17 <mark style='background-color: #ffd33d'>FixEfficientNet-B5</mark>                           86.4%	97.9%	30M O    
18 <mark style='background-color: #ffd33d'>Swin-L(384 res, ImageNet-22k pretrain)</mark>       86.4%   O Microsoft Swin Transformer: Hierarchical Vision Transformer using Shifted Windows 202103    
19 <mark style='background-color: #ffd33d'>NFNet-F5 w/ SAM</mark>                              86.3%		377.2M   X	  
20 <mark style='background-color: #ffd33d'>NoisyStudent(EfficientNet-B5)</mark>                86.1%	97.8%	30M	O   

-------------------
* 2103 <mark style='background-color: #ffd33d'>ResNet-RS  google</mark>, sota는 아니지만 속도 개선, no extra data   
 Revisiting ResNets: Improved Training and Scaling Strategies https://arxiv.org/pdf/2103.07579.pdf      
 ResNet-RS는 EfficientNets보다 1.7 배-2.7 배 빠르면서 ImageNet에서 비슷한 정확도를 달성.    
 대규모 준지도 학습에서 ResNet-RS는 EfficientNet NoisyStudent보다 4.7 배 빠르면서 86.2 % top-1 ImageNet 정확도 달성   
                    image resolution   
 ResNet-RS-420 (320 image res) 84.4% 192M   
 ResNet-RS-350 (320 image res) 84.2%    
 ResNet-RS-350 (256 image res) 84% 164M   
 ResNet-RS-270 (256 image res) 83.8% 130M   
 ResNet-RS-152 (256 image res) 83%    
 ResNet-RS-152 (192 image res) 82% 87M   
 ResNet-RS-101 (160 image res) 80.3% 64M   
 ResNet-RS-50 (160 image res) 78.8% 36M   
 Model     RS-350 ENet-B6 RS-420 ENet-B7   
 Resolution  256     528      320      600   
 Top-1 Acc.  84.0    84.0      84.4     84.7   
 Params (M) 164    43(3.8x)  192      66 (2.9x)   
 FLOPs (B)    69     38(1.8x)  128      74 (1.7x)   
 TPU-v3   
 Latency (s)   1.1     3.0(2.7x)  2.1     6.0 (2.9x)   
 Memory (GB) 7.3   16.6(2.3x) 15.5   28.3 (1.8x)   
 V100   
 Latency (s)    4.7   15.7 (3.3x) 10.2 29.9 (2.8x)   
 Semi-Supervised Learning with ResNet-RS    
 Model          V100 (s) TPUv3 (ms) Top-1    
 EfficientNet-B5 8.16 1510 86.1    
 ResNet-RS-152 1.48 (5.5x) 320 (4.7x) 86.2   

---------------------------
* 2003/2101v3  Meta Pseudo Labels(EfficientNet-L2)  google   90.2%  480M    
	      Meta Pseudo Labels (EfficientNet-B6-Wide)     90%    390M    
                 * 첫버전(2003)에서는 달성율 없고 v3(2101)에서 SOTA 달성   

* 2102  NFNet-F4+  deepmind   89.2%   512M    
 High-Performance Large-Scale Image Recognition Without Normalization   
    
* 2102 ALIGN(EfficientNet-L2)  google   88.64%	480M    
 Scaling Up Visual and Vision-Language Representation Learning With Noisy Text Supervision 2021   
    
* 2010 EfficientNet-L2-475(SAM)  google  88.64% 480M   
 Sharpness-Aware Minimization for Efficiently Improving Generalization   

* 2010 Vision Transformer (ViT-H)  google  88.55% 632M, 300M labeled JFT(extra data)   
 An Image is Worth 16x16 Words: Transformers for Image Recognition at Scale   
   
* 2012 DeiT-B 384  facebook 85.2% 87M (no extra data)    
 Training data-efficient image transformers & distillation through attention   
   
* 2003 FixEfficientNet(L2)   faebook   88.5%  480M   FIXING THE TRAIN-TEST RESOLUTION DISCREPANCY: FIXEFFICIENTNET   
       FixEfficientNet(B7)                87.1%  66M   
       FixEfficientNet(B6)                86.7%  43M   
       FixEfficientNet(B5)                86.4%  30M   
       FixEfficientNet(B4)                85.9%  19M   
       FixEfficientNet(B3)                85%  12M    
       FixEfficientNet(B2)                83.6%  9.2M    
       FixEfficientNet(B1)                82.6%  7.8M   
       FixEfficientNet(B0)                80.2%  5.3M   
* 1911 NoisyStudent(EfficientNet-L2) google 88.4%  480M   
       NoisyStudent(EfficientNet-B7)          86.9%   66M   
       NoisyStudent(EfficientNet-B6)          86.4%   43M   
       NoisyStudent(EfficientNet-B5)          86.1%   30M   
       NoisyStudent(EfficientNet-B4)          85.3%   19M   
       NoisyStudent(EfficientNet-B3)          84.1%   12M    
       NoisyStudent(EfficientNet-B2)          82.4%   9.2M   
       NoisyStudent(EfficientNet-B1)          81.5%   7.8M   
       NoisyStudent(EfficientNet-B0)          78.8%   5.3M   
* 1905 EfficientNet-B7     google      84.4% 66M   
       EfficientNet-B6                    84%   43M   
       EfficientNet-B5                    83.3%  30M   
       EfficientNet-B4                    82.6%  19M   
       EfficientNet-B3                    81.1%  12M    
       EfficientNet-B2                    79.8%   9.2M   
       EfficientNet-B1                    78.8%   7.8M   
       EfficientNet-B0                    76.3%   5.3M                     

---------------------
* <mark style='background-color: #ffd33d'>Meta Pseudo Labels </mark>논문에서 발췌   
 Method  Params ExtraData ImageNetTop-1 Top-5 ImageNet-ReaL    
 ResNet-50             26M − 76.0 93.0 82.94   
 ResNet-152            60M − 77.8 93.8 84.79   
 DenseNet-264        34M − 77.9 93.9 −   
 Inception-v3           24M − 78.8 94.4 83.58   
 Xception                23M − 79.0 94.5 −   
 Inception-v4           48M − 80.0 95.0 −   
 Inception-resnet-v2  56M − 80.1 95.1 −   
 ResNeXt-101           84M − 80.9 95.6 85.18   
 PolyNet                 92M − 81.3 95.8 −   
 SENet                  146M − 82.7 96.2 −    
 NASNet-A              89M − 82.7 96.2 82.56   
 AmoebaNet-A         87M − 82.8 96.1 −    
 PNASNet               86M − 82.9 96.2 −   
 AmoebaNet-C + AutoAugment  155M − 83.5 96.5 −   
 GPipe                   557M − 84.3 97.0 −   
 EfficientNet-B7         66M − 85.0 97.2 −   
 EfficientNet-B7 + FixRes  66M − 85.3 97.4 −   
 EfficientNet-L2         480M − 85.5 97.5    
 extra data 사용    
 ResNet-50 Billion-scale SSL            26M 3.5B labeled Instagram 81.2 96.0 −   
 ResNeXt-101 Billion-scale SSL         193M 3.5B labeled Instagram 84.8 − −   
 ResNeXt-101 WSL                       829M 3.5B labeled Instagram 85.4 97.6 88.19   
 FixRes ResNeXt-101 WSL               829M 3.5B labeled Instagram 86.4 98.0 89.73   
 Big Transfer (BiT-L)                      928M 300M labeled JFT 87.5 98.5 90.54   
 Noisy Student (EfficientNet-L2)       480M 300M unlabeled JFT 88.4 98.7 90.55    
 Noisy Student + FixRes                 480M 300M unlabeled JFT 88.5 98.7 −   
 Vision Transformer (ViT-H)             632M 300M labeled JFT   88.55 − 90.72   
 EfficientNet-L2-NoisyStudent + SAM  480M 300M unlabeled JFT 88.6 98.6   
 Meta Pseudo Labels (EfficientNet-B6-Wide) 390M 300M unlabeled JFT 90.0 98.7 91.12   
 Meta Pseudo Labels (EfficientNet-L2)         480M 300M unlabeled JFT 90.2 98.8 91.02   



