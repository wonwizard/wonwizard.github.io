---
title: GAN Face Generation & Facial expressions
categories: [GAN]
comments: true
---

* GAN Face Generation & Facial expressions  

<video><source type="video/mp4" src="/images/face_movie.mp4"></video>   
<img src="/images/face_star.png">   
<img src="/images/face_yellow.png">   
<img src="/images/face_model.png">   
<img src="/images/face_aniface.png">   
<img src="/images/face_anibody.png">   
<img src="/images/face_direction_value_change.png">  

 > StyleGAN2 모델를 기반으로 얼굴 생성하고 눈깜박임이나 표정등 변환가능한 코드가 있어 테스트해 보았습니다.   
 > StyleGAN2 로 얼굴을 생성한후 이에 특정 피처(eyes_open,happy,angly)를 조금씩 변경해가며 이미지들을 생성하고 이 이미지들로 동영상으로 만드는 코드는 제가 직접 작성하여 동영상으로 만들었습니다.   
 >   
 > 특정 피처 value 리스트 값을 한 프레임이지당 다르게 주면서 값을 크거나 적게 주면 그 해당 특성이 크거나 적게 적용됨을 볼 수 있고 이렇게 값을 리스트로 잘 만들수록 더 자연그럽게 만 들 수 있습니다. 
 >   
 > StyleGAN2(nvidia 발표) 는 2019년 얼굴 생성 최고성능 보였다고 하며 이전에 불안정하게 만들어지거나 선명한 등이 적거나 큰 이미지 크기 만들기 힘든 것에 비해 많이 좋아졌다고 합니다.   
 >   
 > 학습은 StyleGAN2 로 동양인 얼굴들 모아서 pre-train 해 놓은 것을 github에서 받아서 사용하였습니다. 
 > 동영상으로 최종 생성되는 부분은 직접 코딩하였습니다.     
 >   
 > Test   
 > 1024*1024 15장 이미지생성 5초  (초기화 12초)   
 > 1024*1024 30장 프레임이미지생성 10초   
 > GPU 1080ti (11M) 1개   
