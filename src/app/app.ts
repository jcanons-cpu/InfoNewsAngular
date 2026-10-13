import { Component } from '@angular/core';
import { Noticias } from './componentes/noticias/noticias';

interface Noticia {
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
  selector: 'app-root',
  standalone: true,
  imports: [Noticias],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

  private readonly claveFavoritos = 'infon-news-favoritos';

  categorias: string[] = [
    'Todas',
    'Tecnología',
    'Economía',
    'Deportes'
  ];

  busqueda = '';
  categoriaSeleccionada = 'Todas';
  mostrandoFavoritos = false;
  favoritos: number[] = this.cargarFavoritos();
  noticiaSeleccionada: Noticia | null = null;
  mensajeFormulario = '';

  noticias: Noticia[] = [
    {
      id: 1,
      titulo: 'La inteligencia artificial transforma la educación',
      categoria: 'Tecnología',
      fecha: '12 de octubre de 2026',
      autor: 'Equipo InfoNews',
      resumen: 'Las nuevas herramientas digitales están cambiando la forma de aprender y enseñar.',
      contenido: 'La inteligencia artificial ofrece nuevas posibilidades para personalizar el aprendizaje, facilitar el acceso a la información y apoyar a docentes y estudiantes. Su implementación requiere un uso responsable y una adecuada protección de los datos.',
      icono: '💻',
      tema: 'tecnologia'
    },
    {
      id: 2,
      titulo: 'Las pequeñas empresas impulsan la economía',
      categoria: 'Economía',
      fecha: '10 de octubre de 2026',
      autor: 'Equipo InfoNews',
      resumen: 'Los emprendimientos y las pequeñas empresas siguen siendo importantes para el empleo y el desarrollo local.',
      contenido: 'Las pequeñas empresas contribuyen a la generación de empleo, la innovación y el crecimiento de las comunidades. La educación financiera y el acceso a herramientas digitales pueden ayudar a fortalecer sus negocios.',
      icono: '📈',
      tema: 'economia'
    },
    {
      id: 3,
      titulo: 'La actividad física gana espacio entre los jóvenes',
      categoria: 'Deportes',
      fecha: '8 de octubre de 2026',
      autor: 'Equipo InfoNews',
      resumen: 'Las actividades deportivas y recreativas promueven hábitos saludables y el trabajo en equipo.',
      contenido: 'La práctica deportiva favorece el bienestar físico y emocional. Las instituciones educativas y las comunidades pueden promover espacios seguros para que los jóvenes participen en actividades recreativas.',
      icono: '⚽',
      tema: 'deportes'
    },
    {
      id: 4,
      titulo: 'Nuevas herramientas digitales para el trabajo',
      categoria: 'Tecnología',
      fecha: '6 de octubre de 2026',
      autor: 'Equipo InfoNews',
      resumen: 'Las soluciones digitales ayudan a organizar tareas y mejorar la productividad de los equipos.',
      contenido: 'Las herramientas digitales permiten automatizar tareas repetitivas, compartir información y facilitar la colaboración. Elegir la solución adecuada depende de las necesidades de cada organización.',
      icono: '🚀',
      tema: 'tecnologia'
    },
    {
      id: 5,
      titulo: 'La educación financiera cobra importancia',
      categoria: 'Economía',
      fecha: '4 de octubre de 2026',
      autor: 'Equipo InfoNews',
      resumen: 'El manejo responsable del dinero es una habilidad útil para tomar mejores decisiones.',
      contenido: 'Elaborar un presupuesto, ahorrar de forma constante y conocer las condiciones de los productos financieros son prácticas que ayudan a organizar las finanzas personales.',
      icono: '💰',
      tema: 'economia'
    },
    {
      id: 6,
      titulo: 'El trabajo en equipo fortalece el deporte',
      categoria: 'Deportes',
      fecha: '2 de octubre de 2026',
      autor: 'Equipo InfoNews',
      resumen: 'La disciplina, la constancia y la cooperación son fundamentales para alcanzar objetivos deportivos.',
      contenido: 'Además de la preparación física, los equipos deportivos necesitan comunicación, confianza y disciplina. Estas habilidades también son valiosas en los entornos académicos y laborales.',
      icono: '🏆',
      tema: 'deportes'
    }
  ];

  // Cargar los favoritos guardados en el navegador.
  cargarFavoritos(): number[] {
    try {
      const guardados = localStorage.getItem(this.claveFavoritos);

      if (!guardados) {
        return [];
      }

      const datos: unknown = JSON.parse(guardados);

      if (!Array.isArray(datos)) {
        return [];
      }

      return datos.filter(
        (id): id is number => typeof id === 'number'
      );
    } catch {
      return [];
    }
  }

  // Guardar los favoritos.
  private guardarFavoritos(): void {
    try {
      localStorage.setItem(
        this.claveFavoritos,
        JSON.stringify(this.favoritos)
      );
    } catch {
      console.warn('No fue posible guardar los favoritos.');
    }
  }

  // Filtrar las noticias por categoría, búsqueda y favoritos.
  get noticiasFiltradas(): Noticia[] {
    const texto = this.busqueda.toLowerCase().trim();

    return this.noticias.filter((noticia) => {
      const coincideCategoria =
        this.categoriaSeleccionada === 'Todas' ||
        noticia.categoria === this.categoriaSeleccionada;

      const coincideBusqueda =
        noticia.titulo.toLowerCase().includes(texto) ||
        noticia.resumen.toLowerCase().includes(texto) ||
        noticia.categoria.toLowerCase().includes(texto);

      const coincideFavoritos =
        !this.mostrandoFavoritos ||
        this.favoritos.includes(noticia.id);

      return coincideCategoria &&
        coincideBusqueda &&
        coincideFavoritos;
    });
  }

  filtrarCategoria(categoria: string): void {
  this.categoriaSeleccionada = categoria;
  this.mostrandoFavoritos = false;

  setTimeout(() => {
    document.getElementById('noticias')?.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }, 100);
}

  limpiarFiltros(): void {
    this.busqueda = '';
    this.categoriaSeleccionada = 'Todas';
    this.mostrandoFavoritos = false;
  }

  mostrarFavoritos(): void {
  this.mostrandoFavoritos = !this.mostrandoFavoritos;
  this.categoriaSeleccionada = 'Todas';

  setTimeout(() => {
    document.getElementById('noticias')?.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }, 100);
}

  actualizarBusqueda(event: Event): void {
    const elemento = event.target as HTMLInputElement;
    this.busqueda = elemento.value;
  }

  cambiarCategoria(event: Event): void {
    const elemento = event.target as HTMLSelectElement;
    this.categoriaSeleccionada = elemento.value;
    this.mostrandoFavoritos = false;
  }

  iconoCategoria(categoria: string): string {
    switch (categoria) {
      case 'Tecnología':
        return '💻';
      case 'Economía':
        return '📊';
      case 'Deportes':
        return '⚽';
      default:
        return '📰';
    }
  }

  // Abrir la noticia y bajar automáticamente hasta su contenido.
  verDetalle(id: number): void {
    this.noticiaSeleccionada =
      this.noticias.find((noticia) => noticia.id === id) ?? null;

    setTimeout(() => {
      document.getElementById('detalle')?.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }, 100);
  }

  cerrarDetalle(): void {
    this.noticiaSeleccionada = null;
  }

  // Agregar o quitar una noticia de favoritos.
  alternarFavorito(id: number): void {
    if (this.favoritos.includes(id)) {
      this.favoritos = this.favoritos.filter(
        (favorito) => favorito !== id
      );
    } else {
      this.favoritos = [...this.favoritos, id];
    }

    this.guardarFavoritos();
  }

  esFavorita(id: number): boolean {
    return this.favoritos.includes(id);
  }

  // Métodos para conectar el componente de noticias.
  alternarFavoritoDesdeHijo = (id: number): void => {
    this.alternarFavorito(id);
  };

  esFavoritaDesdeHijo = (id: number): boolean => {
    return this.esFavorita(id);
  };

  verDetalleDesdeHijo = (id: number): void => {
    this.verDetalle(id);
  };

  // Validar el formulario de contacto.
  enviarFormulario(event: Event): void {
    event.preventDefault();

    const formulario = event.target as HTMLFormElement;

    if (!formulario.checkValidity()) {
      formulario.reportValidity();
      return;
    }

    this.mensajeFormulario =
      '¡Gracias por contactarnos! Tu formulario fue validado correctamente.';

    formulario.reset();
  }
}