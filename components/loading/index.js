const Loading = () => {
  return (
    <div className="loading-graph">
      <i className="fa fa-circle-o-notch fa-spin fa-3x fa-fw" />
    </div>
  );
};

export const LoadingBox = () => {
  return (
    <div className="loading-box">
      <div className="loading-box-container">
        <div className="loading-box-graph">
          <Loading />
        </div>
      </div>
    </div>
  );
};

export default Loading;
