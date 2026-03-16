# Yerel derleme için kullanılan Dockerfile
# Kaynak koddan tam derleme sürecini destekler

FROM node:20-alpine AS builder

# Çalışma dizinini ayarla
WORKDIR /app

# package dosyalarını kopyala
COPY package.json pnpm-lock.yaml ./

# pnpm kur
RUN npm install -g pnpm

# Bağımlılıkları yükle
RUN pnpm install --frozen-lockfile

# Kaynak kodu kopyala
COPY . .

# Projeyi derle
RUN pnpm run build

# Üretim aşaması
FROM nginx:alpine

# nginx yapılandırma dosyasını kopyala
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Varsayılan nginx statik dosyalarını temizle
RUN rm -rf /usr/share/nginx/html/*

# Derlenmiş çıktıyı nginx statik dosya klasörüne kopyala
COPY --from=builder /app/docs /usr/share/nginx/html

# Açılan port
EXPOSE 80

# nginx başlat
CMD ["nginx", "-g", "daemon off;"]