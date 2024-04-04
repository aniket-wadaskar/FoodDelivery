package com.cg.serviceImpl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cg.dto.CustomerDTO;
import com.cg.entity.Customer;
import com.cg.exception.CustomerNotFoundException;
import com.cg.repository.CustomerRepository;
import com.cg.service.CustomerService;

@Service
public class CustomerServiceImplementation implements CustomerService{
	@Autowired
	private CustomerRepository customerRepository;


	@Override
	public Customer registerCustomer(Customer customer) {
		customerRepository.save(customer);
		
		return customer;
	}

	// Read all Users
	@Override
	public List<CustomerDTO> readAllCustomers() {
		List<Customer> customers = customerRepository.findAll();
		List<CustomerDTO> CustomerDTOs = new ArrayList<CustomerDTO>();
		for (Customer customer : customers) {
			CustomerDTO CustomerDTO = mapCustomerToDTO(customer);
			
			CustomerDTOs.add(CustomerDTO);

		}

		return CustomerDTOs;
	}

	// Update User
	@Override
	public String updateCustomer(int id, Customer user) {

		Customer customer;
		try {
			customer = customerRepository.findById(id).orElseThrow(() -> new CustomerNotFoundException());

			if (user.getUsername() != null)
				customer.setUsername(user.getUsername());

			if (user.getNumber() != 0)
				customer.setNumber(user.getNumber());

			if (user.getAddress() != null)
				customer.setAddress(user.getAddress());

			if (user.getEmail() != null)
				customer.setEmail(user.getEmail());

			customerRepository.save(customer);
		} catch (CustomerNotFoundException e) {
			// TODO Auto-generated catch block
			System.out.println(e);
			return "Invalid customer.Customer data not updated";

		}

		return "Customer Updated Successfully";

	}

	// Delete user
	@Override
	public String deleteCustomer(int id) {
		try {
			customerRepository.findById(id).orElseThrow(()->new CustomerNotFoundException());
			customerRepository.deleteById(id);
			
		}catch (CustomerNotFoundException e) {
			System.out.println(e);
			return "Invalid customer id";
		}
		

		return "Customer deleted successfully.";
	}

	@Override
	public List<CustomerDTO> getByEmail(String email) throws CustomerNotFoundException {
		List<Customer> customers = customerRepository.findByEmail(email);
		if(customers.size()==0) {
			throw new CustomerNotFoundException("invalid email");
		}

		List<CustomerDTO> CustomerDTOs = new ArrayList<CustomerDTO>();

		for (Customer customer : customers) {
			CustomerDTO dtoUser = mapCustomerToDTO(customer);
			
			CustomerDTOs.add(dtoUser);
		}

		return CustomerDTOs;
	}


	@Override
	public CustomerDTO getCustomerById(int id) throws CustomerNotFoundException {
		Customer customer = customerRepository.findById(id).get();
		if(customer==null) {
			throw new CustomerNotFoundException("Invalid customer ID");
		}

		CustomerDTO dtoUser =mapCustomerToDTO(customer);

		return dtoUser;
	}
	
	private CustomerDTO mapCustomerToDTO(Customer customer) {
		CustomerDTO customerDTO = new CustomerDTO();
		customerDTO.setId(customer.getId());
		customerDTO.setAddress(customer.getAddress());
		customerDTO.setEmail(customer.getEmail());
		customerDTO.setNumber(customer.getNumber());
		customerDTO.setPassword(customer.getPassword());
		customerDTO.setUsername(customer.getUsername());
		return customerDTO;
	}
}
