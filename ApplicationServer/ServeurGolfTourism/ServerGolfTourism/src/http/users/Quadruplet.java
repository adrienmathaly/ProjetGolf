/**   \author Adrien ORTOLA */
package http.users;

/**
 * \class Quadruplet
 * \brief Extends Triplet.
 * The purpose of this class is to model a set of four user data.
 * */
public class Quadruplet extends Triplet{

	/** status of a game */
	private Boolean alive;
	
	/** 
	 * \param Float latitude, Float longitude, Float distance, Boolean alive
	 * \return void
	 * \brief Constructor.
	 * */
	public Quadruplet(Float latitude, Float longitude, Float distance, Boolean alive) {
		super(latitude, longitude, distance);
		this.alive=alive;
	}

	/** 
	 * \param none
	 * \return Boolean
	 * \brief returns the status of the game for a player
	 * */
	public Boolean getAlive() {
		return alive;
	}

	/** 
	 * \param Boolean alive
	 * \return void
	 * \brief sets the current state of the game for a player
	 * */
	public void setAlive(Boolean alive) {
		this.alive = alive;
	}

}
