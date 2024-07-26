---
title: Go ile HTTP Sunucusu Oluşturma
date: 2024-07-26
# lastMod: 2024-05-18T07:29:49.820Z
tags: [Go, Networking]
category: Programming
summary: TCP protokolünü kullanarak Go dili ile HTTP sunucusu oluşturmayı öğrenin.
---

# Projeye nasıl başladım?

Yaklaşık 2 ay önce keşfettiğim bir site oldu [CodeCrafters](https://codecrafters.io).
Bu sitede bir çoğumuz kullandı teknolojileri adım adım sizlere nasıl yapıldığını anlatıyor.
Ben bu siteye ilk girdiğimde Go dili ile Redis yapmayı çalışmıştım ama Go ve Redis'in nasıl çalıştığını bilmediğimden çok zorlanmıştım ve bırakmıştım.

Geçen hafta bu siteye bir şans daha vermek istedim ve Redis Clone'dan daha kolay olan HTTP Server bölümünü yaptım.

Şimdi basit bir HTTP Sunucusu Oluşturmanın adımlarını öğrenelim.

## Go ile HTTP Sunucusu Oluşturma

Proje oluşturma ile başlayalım.

```bash
mkdir go-ile-http-sunucusu-olusturma
cd go-ile-http-sunucusu-olusturma
go mod init httpServer
```

Bu adımları izleyerek proje klasörünü ve main.go dosyasını oluşturabilirsiniz.

Şimdi main.go dosyasını oluşturalım. Terminale bu komutu `touch main.go` yazarak dosyayı oluşturabilirsiniz.

```go
package main

import (
	"fmt"
	"net"
	"os"
    "strings"
)

func main() {
	l, err := net.Listen("tcp", "0.0.0.0:4221")
	if err != nil {
		fmt.Println("Failed to bind to port 4221")
		os.Exit(1)
	}
	fmt.Println("Sunucu 4221 portunda başladı!")

	for {
		con, err := l.Accept()

		if err != nil {
			fmt.Println("Error accepting connection: ", err.Error())
			os.Exit(1)
		}

		go handleConnection(con)
	}
}
```

Burada ne yaptığımızı anlatayim.

- `package main`: go programının çalıştırılabilmesi için paketin ismi main olmalıdır.
- `import "net"`: paketin ilgili yerine `net` TCP protokolünü kullanmak için bu paketin kullanılması gerekmektedir.
- `import "fmt"`: bu paketin `fmt.Println() ve fmt.Sprintf()` fonksiyonunu kullanmak için bu paketin kullanılması gerekmektedir.
- `import "os"`: bu paketi `os.Exit()` fonksiyonunu kullanmak için bu paketin kullanılması gerekmektedir.

Fonksiyonun içindeyse TCP sunucumuzu başlatıyoruz eğer bir hata varsa program durduluyor, yok ise infinite loop içerisinde gelecek olan istekleri `l.Accept()` ile kabul edip bunu goroutine ile çalıştırdığımız fonksiyona geçiriyoruz.

Tabii, işte düzeltilmiş hali:

**Not:** `handleConnection(con)` fonksiyonunu bir goroutine ile çalıştırmamızın nedeni, TCP sunucusunun birden fazla isteği aynı anda kabul edebilmesini sağlamaktır. Bu, her yeni bağlantı için ayrı bir işlem iş parçacığı oluşturur ve böylece sunucu, eş zamanlı gelen istekleri etkin bir şekilde işleyebilir.

Şimdi `handleConnection` fonksiyonunu oluşturalım.

```go
func handleConnection(con net.Conn) {
    defer con.Close()

    for {

        req := make([]byte, 1024)
        n, err := con.Read(req) // n: okunan byte sayısı

        if err != nil {
            fmt.Println("Error reading from connection: ", err.Error())
            return
        }

		s := string(req[:n])
		path := strings.Split(s, " ")[1]
		if path == "/" {
			con.Write([]byte("HTTP/1.1 200 OK\r\n\r\n"))
			con.Close()
			return
		}

    }
}
```

Basitte olsa şu anda TCP sunucumuzun çalışması gerekiyor. Terminale `go run main.go` yazıp programı çalıştırıp yeni bir terminal açıp
`curl -v http://localhost:4221` yazarak HTTP/1.1 200 OK cevabını alabilirsiniz.

Bu şekilde sunucumuzun çalışıp çalışmadağını test edebiliriz.

Tabii, http://localhost:4221/echo/{str} gibi bir URL ile gelen bir HTTP isteğinde {str} parametresini alıp,
bunu bir yanıt olarak döndüren basit bir HTTP controllerı oluşturalım.

handleConnection fonksiyonun içerisinde bu kodları yazacağız:

```go

p := strings.Split(path, "/")[1]
if p == "echo" {
    message := strings.Split(path, "/")[2]
	res := fmt.Sprintf("HTTP/1.1 200 OK\r\nContent-Type: text/plain\r\nContent-Length:%d\r\n\r\n%s", len(message), message)
	con.Write([]byte(res))
	return
}
```

Bu kodu da ekledikten sonra tekrardan `go run main.go` ile programı yeniden çalıştırıp, `curl -v http://localhost:4221/echo/hello` adresine istek gönderebilirsiniz.

Bize dönmesi gereken sonuç budur:

```bash
* Host localhost:4221 was resolved.
* IPv6: ::1
* IPv4: 127.0.0.1
*   Trying [::1]:4221...
* Connected to localhost (::1) port 4221
> GET /echo/hello HTTP/1.1
> Host: localhost:4221
> User-Agent: curl/8.6.0
> Accept: */*
>
< HTTP/1.1 200 OK
< Content-Type: text/plain
< Content-Length:5
<
* Connection #0 to host localhost left intact
hello%
```

### Tüm kod

Altta bulunan kopyalarak direkt olarak çalıştırabilirsiniz.

```go
package main

import (
	"fmt"
	"net"
	"os"
	"strings"
)

func main() {
	l, err := net.Listen("tcp", "0.0.0.0:4221")
	if err != nil {
		fmt.Println("Failed to bind to port 4221")
		os.Exit(1)
	}
	fmt.Println("Sunucu 4221 portunda başladı!")

	for {
		con, err := l.Accept()

		if err != nil {
			fmt.Println("Error accepting connection: ", err.Error())
			os.Exit(1)
		}

		go handleConnection(con)
	}
}

func handleConnection(con net.Conn) {
	defer con.Close()

	for {

		req := make([]byte, 1024)
		n, err := con.Read(req) // n: okunan byte sayısı

		if err != nil {
			fmt.Println("Error reading from connection: ", err.Error())
			return
		}

		s := string(req[:n])
		path := strings.Split(s, " ")[1]
		if path == "/" {
			con.Write([]byte("HTTP/1.1 200 OK\r\n\r\n"))
			con.Close()
			return
		}

		p := strings.Split(path, "/")[1]
		if p == "echo" {
			message := strings.Split(path, "/")[2]
			res := fmt.Sprintf("HTTP/1.1 200 OK\r\nContent-Type: text/plain\r\nContent-Length:%d\r\n\r\n%s", len(message), message)
			con.Write([]byte(res))
			return
		}

	}
}
```

# Bitiş

Bu yazımda sizlere basitçe TCP protokolü ile nasıl basit bir TCP sunucusu oluşturabileceğinizi gösterdim. CodeCrafters ile oluşturduğum HTTP sunucusunun github reposuna ulaşmak isterseniz [Repo](https://github.com/aliyasirnac/go-http-server) tıklayarak kodlara ulaşabilirsiniz.
