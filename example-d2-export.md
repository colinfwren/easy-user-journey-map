# Example D2 export

Paste this into [https://play.d2lang.com](the D2 Playground) to see the map

```
direction: right
landing-page: Landing page {
  shape: image
  icon: https://i.imgur.com/aKABpXN.png
}
chocolate-listing-page: Chocolate listing page {
  shape: image
  icon: https://i.imgur.com/TLw7EnT.png
}
chocolate-detail-page: Chocolate detail page {
  shape: image
  icon: https://i.imgur.com/9J5TfGI.png
}
basket-page: Basket page {
  shape: image
  icon: https://i.imgur.com/VLJ9vnr.png
}
login-page: Login page {
  shape: image
  icon: https://i.imgur.com/fFTjZBR.png
}
payment-details-page: Payment details page {
  shape: image
  icon: https://i.imgur.com/3IS59g3.png
}
confirm-order-page: Confirm order page {
  shape: image
  icon: https://i.imgur.com/5WblWUP.png
}
order-confirmation-page: Order confirmation page {
  shape: image
  icon: https://i.imgur.com/s5DnmcA.png
}
flower-listing-page: Flower listing page {
  shape: image
  icon: https://i.imgur.com/OA207pi.png
}
flower-detail-page: Flower detail page {
  shape: image
  icon: https://i.imgur.com/EvNDXG2.png
}
post-select-chocolate-subscription-frequency: Select chocolate subscription frequency {
  shape: image
  icon: https://i.imgur.com/KDlTnjl.png
}
account-details-page: Account details page{
  shape: image
  icon: https://i.imgur.com/6txriwb.png
}
address-details-page: Address details page {
  shape: image
  icon: https://i.imgur.com/giGw2nI.png
}

landing-page -> chocolate-listing-page: Select chocolates
chocolate-listing-page -> chocolate-detail-page: Select chocolate to buy
chocolate-detail-page -> basket-page: Add chocolate to basket
basket-page -> login-page: Proceed to checkout
login-page -> payment-details-page: Log into account
payment-details-page -> confirm-order-page: Submit payment details
confirm-order-page -> order-confirmation-page: Confirm order
landing-page -> flower-listing-page: Select flowers
flower-listing-page -> flower-detail-page: Select flower package to buy
flower-detail-page -> basket-page: Add flower package to basket
chocolate-detail-page -> post-select-chocolate-subscription-frequency: Select chocolate subscription frequency
post-select-chocolate-subscription-frequency -> basket-page: Add chocolate subscription to basket
login-page -> account-details-page: Register account
account-details-page -> address-details-page: Submit personal details
address-details-page -> payment-details-page: Submit address details
```