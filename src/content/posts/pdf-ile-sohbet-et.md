---
title: PDF'in ile Sohbet Et!
date: 2024-11-23
summary: RAG yöntemini kullanarak PDF'in ile sohbet et!
category: Programming
tags: [Python, Langchain, AI]
---

## RAG Nedir?

Retrieval-Augmented Generation (RAG), bir yapay zeka modelinin dış bir bilgi kaynağı ile desteklenerek daha doğru ve bağlama uygun cevaplar üretmesini sağlayan bir tekniktir. Bu yöntem, özellikle büyük dil modellerinin hafıza sınırlarını aşmak ve daha güncel bilgilerle etkileşim sağlamak için kullanılır. RAG iki temel bileşen üzerine kuruludur:

1. **Retrieval (Bilgi Getirme):** Bir bilgi kaynağından (örneğin, bir PDF, veri tabanı veya Elasticsearch dizini) kullanıcı sorusuna uygun verilerin alınması.
2. **Generation (Cevap Üretme):** Alınan bilginin bir dil modeli tarafından işlenerek kullanıcıya anlamlı bir cevap oluşturulması.

Bu yöntem, kullanıcıdan gelen sorulara verilen cevapların hem daha doğru hem de daha bağlama uygun olmasını sağlar.

## PDF ile Sohbet Etmek

RAG yöntemini kullanarak bir PDF dosyasını analiz etmek ve onunla sohbet etmek mümkündür. Bu işlem, özellikle uzun dokümanlar üzerinde bilgi bulmayı kolaylaştırır. Python'da **LangChain** ve **PyPDF2** gibi popüler kütüphanelerle bunu gerçekleştirmek oldukça kolaydır.

### Gerekli Kütüphaneler

PDF dosyanızla sohbet etmek için aşağıdaki Python kütüphanelerine ihtiyaç duyacaksınız:

- **LangChain:** Dil modeliyle entegrasyon ve RAG iş akışı için.
- **PyPDF2:** PDF dosyasından metin çıkarmak için.
- **FAISS:** Bilgi getirmenin hızlı bir şekilde yapılabilmesi için vektör tabanlı bir arama motoru.
- **OpenAI API veya Hugging Face Transformers:** Doğal dil işleme için güçlü bir dil modeli.

Kütüphaneleri yüklemek için şu komutu kullanabilirsiniz:

```bash
pip install langchain PyPDF2 faiss-cpu openai
```
