/**   \author Adrien ORTOLA */
package http.users;

/**
 * \class Triplet
 * \brief The purpose of this class is to model a set of three user data.
 * */
public class Triplet {

	/** the latitude of a user */
	private Float latitude;
	/** the longitude of a user */
	private Float longitude;
	/** the summed traveled distances of a user */
	private Float distance;
	
	/** 
	 * \param Float latitude, Float longitude, Float distance
	 * \return void
	 * \brief Constructor.
	 * */
	public Triplet(Float latitude, Float longitude, Float distance) {
		super();
		this.latitude = latitude;
		this.longitude = longitude;
		this.distance = distance;
	}
	
	/** 
	 * \param none
	 * \return Float
	 * \brief returns the latitude of a user
	 * */
	public Float getLatitude() {
		return latitude;
	}
	
	/** 
	 * \param Float latitude
	 * \return void
	 * \brief sets the latitude of a user
	 * */
	public void setLatitude(Float latitude) {
		this.latitude = latitude;
	}
	
	/** 
	 * \param none
	 * \return Float
	 * \brief returns the longitude of a user
	 * */
	public Float getLongitude() {
		return longitude;
	}
	
	/** 
	 * \param Flaot longitude
	 * \return void
	 * \brief sets the longitude of a user
	 * */
	public void setLongitude(Float longitude) {
		this.longitude = longitude;
	}
	
	/** 
	 * \param none
	 * \return void
	 * \brief returns the distance of a user
	 * */
	public Float getDistance() {
		return distance;
	}
	
	/** 
	 * \param Float distance
	 * \return void 
	 * \brief sets the distance of a user
	 * */
	public void setDistance(Float distance) {
		this.distance = distance;
	}
}
