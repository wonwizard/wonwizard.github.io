---
title: Toon Animation 20210509
categories: [GAN]
comments: true
---

## Toon Animation    

# 웹툰 이미지를 움직이게 하기 최신 논문 모델 테스트    

지난번에 StyleGAN2를 통한 툰 이미지 생성및 변환에 이어 이번에는 툰 이미지를 움직이게 해 보았습니다.    
이미지를 주어진 동영상과 같게 움직이게 만들어주는 First Order Motion Model for Image Animation의 후속 최신 모델 Motion Representations for Articulated Animation 논문과 소스가 공개되어 이를 이용해 웹툰 여신강림 여주를 움직이게 해 보았습니다.    
이미지 한 장을 넣고 동작을 참조할 동영상을 넣으면 이미지가 해당 동영상의 동작대로 동영상이 생성됩니다.    
논문에서 보여준 동영상도 같이 첨부하였습니다.     
여신강림 팬들은 여주를 망가트렸다고 뭐라 할지도 모르겠네요. 죄송합니다. 제가 만든 모델도 아닌데 미안 할 것은 아닌 것 같기도 하고... ^^;       
아주 잘 된다고 말하긴 그렇고 제약도 많지만 계속 발전할 것이라고 생각됩니다.     
제가 제대로 잘하지 못했을수도 있고, 사진이 아닌 웹툰 이미지로 테스트했고 여러 다양한 시험은 하지 않고 간단하게만 테스트해 본것이므로 이 것으로 이 논문 모델의 성능을 확정하진 말아 주셨으면 합니다.    

<video width="256" controls autoplay loop><source type="video/mp4" src="/images/face_movie.mp4"></video> 


아래 제가 테스트했던 대로의 colab 코드 공유 합니다.    
<a href="https://colab.research.google.com/drive/1kYUTJAPLJb9iOBaIJAK7vXYC6SS-4inH?usp=sharing"> https://colab.research.google.com/drive/1kYUTJAPLJb9iOBaIJAK7vXYC6SS-4inH?usp=sharing </a>  

테스트한 논문 Motion Representations for Articulated Animation (22 Apr 2021) 는 4월 22일 submit 되고 10일전 소스가 github 에 올라왔습니다.    
아래는 해당 논문에 대한 설명과 이전 논문 First Order Motion Model 과 비교 설명 글입니다.    
<a href="https://snap-research.github.io/articulated-animation/"> https://snap-research.github.io/articulated-animation/ </a>
