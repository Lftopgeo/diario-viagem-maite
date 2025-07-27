import { supabase } from '../lib/supabase';

export class UploadService {
  // Upload de arquivo para o Supabase Storage
  static async uploadFile(file: File, folder: 'fotos' | 'videos'): Promise<string> {
    try {
      // Gerar nome único para o arquivo
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `${folder}/${fileName}`;

      // Upload do arquivo
      const { data, error } = await supabase.storage
        .from('memorias-maite')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (error) {
        console.error('Erro no upload:', error);
        throw error;
      }

      // Obter URL pública do arquivo
      const { data: urlData } = supabase.storage
        .from('memorias-maite')
        .getPublicUrl(filePath);

      return urlData.publicUrl;
    } catch (error) {
      console.error('Erro ao fazer upload:', error);
      throw new Error('Erro ao fazer upload do arquivo. Tente novamente.');
    }
  }

  // Upload múltiplo de arquivos
  static async uploadMultipleFiles(files: File[], folder: 'fotos' | 'videos'): Promise<string[]> {
    try {
      const uploadPromises = Array.from(files).map(file => 
        this.uploadFile(file, folder)
      );
      
      return await Promise.all(uploadPromises);
    } catch (error) {
      console.error('Erro ao fazer upload múltiplo:', error);
      throw new Error('Erro ao fazer upload dos arquivos. Tente novamente.');
    }
  }

  // Validar arquivo de imagem
  static validateImageFile(file: File): boolean {
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    const maxSize = 10 * 1024 * 1024; // 10MB

    if (!validTypes.includes(file.type)) {
      alert('Tipo de arquivo não suportado. Use JPEG, PNG, GIF ou WebP.');
      return false;
    }

    if (file.size > maxSize) {
      alert('Arquivo muito grande. O tamanho máximo é 10MB.');
      return false;
    }

    return true;
  }

  // Validar arquivo de vídeo
  static validateVideoFile(file: File): boolean {
    const validTypes = ['video/mp4', 'video/mov', 'video/avi', 'video/webm'];
    const maxSize = 100 * 1024 * 1024; // 100MB

    if (!validTypes.includes(file.type)) {
      alert('Tipo de arquivo não suportado. Use MP4, MOV, AVI ou WebM.');
      return false;
    }

    if (file.size > maxSize) {
      alert('Arquivo muito grande. O tamanho máximo é 100MB.');
      return false;
    }

    return true;
  }

  // Redimensionar imagem antes do upload (opcional)
  static async resizeImage(file: File, maxWidth: number = 1920, maxHeight: number = 1080, quality: number = 0.8): Promise<File> {
    return new Promise((resolve) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();

      img.onload = () => {
        // Calcular novas dimensões mantendo proporção
        let { width, height } = img;
        
        if (width > height) {
          if (width > maxWidth) {
            height = (height * maxWidth) / width;
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width = (width * maxHeight) / height;
            height = maxHeight;
          }
        }

        canvas.width = width;
        canvas.height = height;

        // Desenhar imagem redimensionada
        ctx?.drawImage(img, 0, 0, width, height);

        // Converter para blob
        canvas.toBlob((blob) => {
          if (blob) {
            const resizedFile = new File([blob], file.name, {
              type: file.type,
              lastModified: Date.now()
            });
            resolve(resizedFile);
          } else {
            resolve(file);
          }
        }, file.type, quality);
      };

      img.src = URL.createObjectURL(file);
    });
  }
}