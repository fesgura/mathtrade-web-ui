import Thumbnail from "components/thumbnail";
import Previewer from "components/previewer";

const Quad = ({ item }) => {
  return (
    <div className="post-mt-myItem_quad">
      <div className="post-mt-myItem_quad_inner">
        <div className="post-mt-myItem_quad_inner-thumbnail">
          <Thumbnail
            src={item.elements[0].thumbnail}
            width={150}
            height={150}
          />
          <Previewer colorInverted id={item?.id} />
        </div>

        <div className="post-mt-myItem_quad_title">{item.title}</div>
      </div>
    </div>
  );
};
export default Quad;
