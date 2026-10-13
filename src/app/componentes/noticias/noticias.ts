import { Component, Input } from '@angular/core';

export interface Noticia {
  id: number;
  titulo: string;
  categoria: string;
  fecha: string;
  autor: string;
  resumen: string;
  contenido: string;
  icono: string;
  tema: string;
}

@Component({
  selector: 'app-noticias',
  standalone: true,
  imports: [],
  templateUrl: './noticias.html',
  styleUrl: './noticias.css'
})
export class Noticias {
  @Input() noticias: Noticia[] = [];
  @Input() favoritos: number[] = [];

  @Input() alternarFavorito: (id: number) => void = () => {};
  @Input() esFavorita: (id: number) => boolean = () => false;
  @Input() verDetalle: (id: number) => void = () => {};
}