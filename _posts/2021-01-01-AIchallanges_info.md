---
title: AI Challange 대회 참여 설명글들 
categories: [AIchallange]
comments: true
---


-----------------

* 20210319 캐글 대회 RANZCR CLiP - Catheter and Line Position Challenge 에서 11위 설명글
  > https://www.facebook.com/groups/KaggleKoreaOpenGroup/permalink/863920357673398/
  >     
  >  캐글 대회 RANZCR CLiP - Catheter and Line Position Challenge 에서 11위/1547명 으로 솔로 금메달    
  >  https://www.kaggle.com/c/ranzcr-clip-catheter-line-classification/discussion/226557
  >  1) 고해상도를 어떻게 활용할 것인가? - Downconv
  >  2) 카테터 위치 정보를 어떻게 활용할 것인가? - Pre-training
  >  3) unlabeled data를 어떻게 활용할 것인가? - Pseudo-training   
  >  <br>         
  >  1위 솔루션 https://www.kaggle.com/c/ranzcr-clip-catheter-line-classification/discussion/226633
  >  <br>
  >    - 카테터 관련 마스크 3개 생성, 이를 예측하는 UNet 모델 여러개 학습 후 pseudo-training   <br>
  >    - 원래 이미지에 예측된 마스크 3개를 concat한 것을 인풋으로 사용하여 분류 모델 여러개 학습 후 pseudo-training  <br>    
  >    - multi-label 중 적절한 경우 multi-class loss 적용    <br>  
  >    - segmentation 이미지 사이즈 > 1024, classification 이미지 사이즈: 384~512 (segmentation에서 훨씬 높은 이미지 해상도를 필요로 함을 알 수 있습니다.)  <br>

-----------------

* 2020.12.27 IITP 그랜드 챌린지 폭력 상황 음성인지 1위 설명들
  > https://ai4nlp.tistory.com/m/17
  > 1. 음성인식 후 생성된 텍스트를 분류 방법 사용. 데이터는 아래 직접 모은 데이터 사용. 
  >    - 음성인식 모델 :  Seq2Seq with attention + CTC   
  >    - 텍스트 분류 모델 : KoELECTRA 
  > 2. 학습 데이터 : 라벨 5개, 직접 모아 설문조사하여 라벨링.
  >           데이터 증강은 번역 및 문장 사이의 순서 변환으로 증강
  >  <br>
  >  위 팀이 NIPA 경진대회 음성 분야도 나갔는데 
  >  오히려 sota 모델들이 잘 작동하지 않았고, 이러한 AI 챌린지은 데이터가 작은 편이고 요즘 SOTA들은 많은 데이터에 적합하기 때문에, 적은 데이터에서 잘 작동하는 모델(Transformer보다는 RNN)과 적절한 일반화 기법들(Dropout, Normalization, Weight decay), 데이터 증강 기법(Data augmentation)들이 좋은 결과를 만들어 줬다고 함
  >  https://ai4nlp.tistory.com/9?category=837661

-----------------

