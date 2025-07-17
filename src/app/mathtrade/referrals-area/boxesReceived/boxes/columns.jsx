import PhotoGallery from "@/components/photoGallery";
import BoxCell from "./boxCell";

const columns = [
  {
    header: "#",
    noTranslateHeader: true,
    value: "id",
    excel: (item, value, k) => {
      return k + 1;
    },
    render: (item, value, k) => {
      return k + 1;
    },
  },
  {
    header: "boxesReceived.table.invoice",
    value: "image",
    excel: false,
    render: (_, image) => {
      return !image ? (
        "-"
      ) : (
        <div className="w-16">
          <PhotoGallery images={image} extended noTitled />
        </div>
      );
    },
  },
  {
    header: "boxesReceived.table.tracking",
    value: "tracking",
    render: (_, tracking) => {
      return tracking ? (
        <a
          href={`https://www.viacargo.com.ar/tracking/${tracking}`}
          className="text-primary font-bold  hover:text-sky-700 underline"
          target="_blank"
          rel="noreferrer"
        >
          {tracking}
        </a>
      ) : (
        "-"
      );
    },
    sort: true,
  },
  {
    header: "boxesReceived.table.origin_name",
    value: "origin_name",
    sort: true,
  },
  {
    header: "boxesReceived.table.price",
    value: "priceTotal",
    sort: true,
    render: ({ itemsCount, pricePerItem }, priceTotal) => {
      return (
        <>
          {`${priceTotal} / ${itemsCount} ejemplares = `}
          <strong>{`${pricePerItem} por ejemplar`}</strong>
        </>
      );
    },
    excel: ({ itemsCount, pricePerItem }, priceTotal) => {
      return `${priceTotal} / ${itemsCount} ejemplares = ${pricePerItem} por ejemplar`;
    },
  },
  {
    header: "boxesReceived.table.boxes",
    value: "boxes",
    render: (_, boxes) => {
      return boxes.map((box, k) => {
        return <BoxCell key={box.id} box={box} isFirst={k === 0} />;
      });
    },
    excel: ({ boxes }, value) => {
      return boxes
        .map((box) => {
          return (
            `${box.name}: ${box.items
              .map((item) => {
                return `${item.name} - recibe ${item.user}`;
              })
              .join(", ")}` +
            (box.comment ? `. Comentario: ${box.comment}` : "")
          );
        })
        .join("|");
    },
  },
];

export default columns;
