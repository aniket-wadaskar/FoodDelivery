package com.cg.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity(name = "CustomerDB")
public class Customer {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	protected int id;
	
	protected String username;
	
	protected String password;
	
	protected String email;
	
	protected long number;

	protected String address;
}
