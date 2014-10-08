/**   \author Adrien ORTOLA */
package http.users;

/**
 * \class User
 * \brief The purpose of this class is to model the features of a user
 * */
public class User {
	
	/** connection status */
	private boolean connected;
	/** creation status */
	private boolean fullyCreated;
	/** longitude */
	private float longitude;
	/** latitude */
	private float latitude;
	/** sum of all traveled distances */
	private float traveledDistance;
	/** longitude of the ball */
	private float ballLongitude;
	/** latitude of the ball */
	private float ballLatitude;
	
	/** 
	 * \param none
	 * \return void
	 * \brief Constructor.
	 * */
	public User(){
		this.setConnected(true);
		this.setFullyCreated(false);
	}

	/** 
	 * \param none
	 * \return boolean
	 * \brief returns the connection status
	 * */
	public boolean isConnected() {
		return connected;
	}

	/** 
	 * \param boolean connected
	 * \return void
	 * \brief set the connection status
	 * */
	public void setConnected(boolean connected) {
		this.connected = connected;
	}

	/** 
	 * \param none
	 * \return float
	 * \brief get the longitude of the user
	 * */
	public float getLongitude() {
		return longitude;
	}

	/** 
	 * \param float longitude
	 * \return void
	 * \brief set the longitude of a user
	 * */
	public void setLongitude(float longitude) {
		this.longitude = longitude;
	}

	/** 
	 * \param none
	 * \return float
	 * \brief returns the latitude of the user
	 * */
	public float getLatitude() {
		return latitude;
	}

	/** 
	 * \param float latitude
	 * \return void
	 * \brief set the latitude of the user
	 * */
	public void setLatitude(float latitude) {
		this.latitude = latitude;
	}

	/** 
	 * \param none
	 * \return float
	 * \brief returns the traveled distance
	 * */
	public float getTraveledDistance() {
		return traveledDistance;
	}

	/** 
	 * \param float traveledDistance
	 * \return void
	 * \brief set the traveled distance
	 * */
	public void setTraveledDistance(float traveledDistance) {
		this.traveledDistance = traveledDistance;
	}
	
	/** 
	 * \param Point p
	 * \return void
	 * \brief set the location of the user
	 * */
	public void setLocation(Point p){
		this.setLatitude(p.getLatitude());
		this.setLongitude(p.getLongitude());
	}
	
	/** 
	 * \param Point p
	 * \return void
	 * \brief set the location of the ball
	 * */
	public void setBallLocation(Point p){
		this.setLatitude(p.getLatitude());
		this.setLongitude(p.getLongitude());
	}
	
	/** 
	 * \param none
	 * \return Point
	 * \brief returns the location of the user
	 * */
	public Point getLocation(){
		return new Point(getLatitude(),getLongitude());
	}

	/** 
	 * \param none
	 * \return boolean
	 * \brief verifies if the user is fully created
	 * */
	public boolean isFullyCreated() {
		return fullyCreated;
	}

	/** 
	 * \param boolean fullycreated
	 * \return void
	 * \brief set the creation status of the user
	 * */
	public void setFullyCreated(boolean fullyCreated) {
		this.fullyCreated = fullyCreated;
	}

	/** 
	 * \param none
	 * \return float
	 * \brief returns the longitude of the ball
	 * */
	public float getBallLongitude() {
		return ballLongitude;
	}

	/** 
	 * \param float ballLongitude
	 * \return void
	 * \brief sets the longitude of the ball
	 * */
	public void setBallLongitude(float ballLongitude) {
		this.ballLongitude = ballLongitude;
	}

	/** 
	 * \param none
	 * \return float
	 * \brief returns the latitude of the ball
	 * */
	public float getBallLatitude() {
		return ballLatitude;
	}

	/** 
	 * \param float ballLatitude
	 * \return void
	 * \brief sets the latitude of the ball
	 * */
	public void setBallLatitude(float ballLatitude) {
		this.ballLatitude = ballLatitude;
	}
}
