import React from "react";
import { Pagination } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

function Paginate({ pages, page, keyword = "" }) {
	if (keyword) {
		keyword = keyword.split("?keyword=")[1].split("&")[0];
	}

	return (
		pages > 1 && (
			<div class="text-center">
				<Pagination style={{ display: "inline-block" }}>
					{[...Array(pages).keys()].map((x) => (
						<LinkContainer
							style={{ display: "inline-block", margin: "10px" }}
							key={x + 1}
							to={{
								pathname: "",
								search: `?keyword=${keyword}&page=${x + 1}`,
								hash: "#hash",
							}}
						>
							<Pagination.Item key={x} disabled={x + 1 === page}>
								{x + 1}
							</Pagination.Item>
						</LinkContainer>
					))}
				</Pagination>
			</div>
		)
	);
}

export default Paginate;