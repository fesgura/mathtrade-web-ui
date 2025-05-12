"use client";
import I18N from "@/i18n";
import SectionCommon from "@/components/sections/common";

const TermConditionsPage = () => {
  return (
    <div className="py-8">
      <SectionCommon>
        <article className="relative py-8 md:px-8 px-3 max-w-5xl mx-auto rich-text">
          <h1>
            <I18N id="title.TyC" />
          </h1>
          <p>
            Bienvenides al Math Trade Argentina 2025, el mejor del mundo. Te
            agradecemos por sumarte y hacer una comunidad argentina de juegos de
            mesa cada vez más grande.
          </p>
          <p>
            El MT es una experiencia maravillosa que no sólo consiste en el
            intercambio masivo de juegos, sino también en el fortalecimiento, la
            confianza y el compromiso de la propia comunidad. Pero antes de
            empezar a correr algoritmos y cambiar juegos de manos, es importante
            que tengas en cuenta algunas consideraciones fundamentales:
          </p>
          <ol className="tyc-ul">
            <li>
              Los cambios finales son un compromiso. Cada juego ofrecido o
              deseado puede transformarse en un cambio definitivo. Analizá y
              revisá bien tus decisiones antes de que se conozcan los resultados
              definitivos. Como consejo, te recomendamos preguntarte si estás
              conforme con el peor de tus posibles cambios.{" "}
            </li>
            <li>
              No cumplir con un cambio establecido implica el baneo permanente
              del MT. El sistema se basa en la confianza y el compromiso entre
              usuaries y quebrarlo arruina la experiencia de todes.
            </li>
            <li>
              Los cambios pueden generar costos de envío, que deben ser
              costeados por quien recibe cada juego. Pero a no preocuparse
              porque se realizan envíos compartidos para abaratar costos. Es
              probable que en algunos casos el envío se realice en dos tramos,
              pasando por CABA como punto intermedio (cuando es más barato que
              el envío directo).{" "}
            </li>
            <li>
              En este MT se decidió contratar un servicio de Logística.
              Estimamos que costará unos 100 pesos por juego cambiado. El pago
              de este monto será obligatorio y nos permitirá hacer aún mejor las
              cosas.
            </li>
            <li>
              Participar del MT requiere responsabilidad. Ser precisos con los
              datos de los juegos y su estado es importante para evitar que haya
              disgustos con los cambios finales. Prestá atención a las
              categorías de estados de los juegos y elegí la más adecuada. Ante
              alguna duda, te recomendamos elegir siempre la más baja. Del mismo
              modo, comprobá que estés eligiendo la versión y el idioma correcto
              de tus juegos.
              <br />
              La BGG es solo una ayuda, consignar los datos correctos son tu
              responsabilidad absoluta.
            </li>
            <li>
              En el MT se cambian juegos usados (mayoritariamente). Pueden
              existir diferencias subjetivas sobre las categorías de estado de
              los juegos. Tratá de tener una visión comprensiva, ya que todes
              buscamos lo mejor para el MT. Si existen discrepancias importantes
              o no te contenta la situación, primero intentá resolver la
              situación con la persona que entregó el juego. Si no obtenés la
              respuesta que esperabas, comunicate con la organización.
              <br />
              Los juegos viajan mucho. Hemos tenido casos de un juego que de
              Jujuy va a Buenos Aires y luego a Catamarca. Pueden pasar cosas en
              el medio, hacemos todo lo posible para que no pase, pero puede
              pasar.
            </li>
            <li>
              En este MT volvemos a ayudar con una causa solidaria. En el
              anterior le armamos una hermosa ludoteca a un Hospital
              infantojuvenil de Las Heras, Mendoza. Esta vez tenemos el objetivo
              de ayudar a un Hogar de pibes de la calle de Lanús. Vas a poder
              enviar algún juego en buen estado para que lo disfruten en la Casa
              de los Chicos Ceferino (Personería jurídica Nº 11.135)
            </li>
            <li>
              Por último, tené en cuenta que las personas que llevamos adelante
              el MT lo hacemos por amor y pasión a esta afición, no tenemos
              beneficios económicos de ningún tipo y estamos felices de
              colaborar, pero tampoco somos el servicio de atención al cliente
              de Aduana (?) Somos mejores (?){" "}
            </li>
          </ol>
        </article>
      </SectionCommon>
    </div>
  );
};

export default TermConditionsPage;
