from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from nestquest.models import HousingOffer, HousingRequest, HousingRequest, Message
from nestquest.serializers import HousingRequestSerializer, HousingRequestSerializer, MessageSerializer
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getMyRequests(request):

    user = request.user
    housingrequests = HousingRequest.objects.filter(user=user)
    
    page = request.query_params.get('page')
    paginator = Paginator(housingrequests, 10) 

    try:
        housingrequests = paginator.page(page)
    except PageNotAnInteger:
        housingrequests = paginator.page(1)
    except EmptyPage:
        housingrequests = paginator.page(paginator.num_pages)


    serializer = HousingRequestSerializer(housingrequests, many=True)
    return Response({'requests': serializer.data, 'page': page, 'pages': paginator.num_pages})



@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getChat(r, pk):
    print(pk)
    messages = Message.objects.all().filter(request=pk).order_by('created_at')
    serializer = MessageSerializer(messages, many=True)
    
    return Response(serializer.data)


@api_view(['GET'])
def getOfferRequests(request):
    housing_offer_id = request.query_params.get('housing_offer')
    
    try:
        housing_offer = HousingOffer.objects.get(id=housing_offer_id)
        housing_requests = HousingRequest.objects.filter(housing_offer=housing_offer)
        
        page = request.query_params.get('page')
        paginator = Paginator(housing_requests, 2)

        try:
            housing_requests = paginator.page(page)
        except PageNotAnInteger:
            housing_requests = paginator.page(1)
        except EmptyPage:
            housing_requests = paginator.page(paginator.num_pages)

        if page == None:
            page = 1

        page = int(page)
        serializer = HousingRequestSerializer(housing_requests, many=True)
        return Response({'requests': serializer.data, 'page': page, 'pages': paginator.num_pages})
    except HousingOffer.DoesNotExist:
        return Response("HousingOffer with the provided ID does not exist.", status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def getRequest(request, pk):
    
    housingrequest = HousingRequest.objects.get(_id=pk)
    serializer = HousingRequestSerializer(housingrequest, many=False)
    return Response(serializer.data)




@api_view(['DELETE'])
def deleteRequest(request, pk):
    
    housingrequest = HousingRequest.objects.get(_id=pk)
    housingrequest.delete()
    return Response('Deleted')


@api_view(['POST'])
def createRequest(request):
    try:
        data = request.data
        user = request.user
        housing_offer_id = int(data['housing_offer_id'])
        
    
        existing_request = HousingRequest.objects.filter(user=user, housing_offer_id=housing_offer_id)
        if existing_request.exists():
            return Response("You have already made a request for this housing offer.", status=status.HTTP_400_BAD_REQUEST)
        
        housing_offer = HousingOffer.objects.get(pk=housing_offer_id)  
        housingrequest = HousingRequest.objects.create(
            user=user,
            housing_offer=housing_offer 
        )

        message = Message.objects.create(user=user, content = data['content'], request = housingrequest)
        serializer = HousingRequestSerializer(housingrequest, many=False)
        return Response(serializer.data)
    except HousingOffer.DoesNotExist:
        return Response("HousingOffer with the provided ID does not exist.", status=status.HTTP_400_BAD_REQUEST)
    except Exception as e:
        print(e)
        return Response(str(e), status=status.HTTP_400_BAD_REQUEST)






@api_view(['PUT'])
def updateRequest(request, pk):
    try:
        data = request.data
        housingrequest = HousingRequest.objects.get(_id=pk)

        housingrequest.housing_offer_id = data['offer_id']

        housingrequest.save()

        serializer = HousingRequestSerializer(request, many=False)
        return Response(serializer.data)
    except HousingRequest.DoesNotExist:
        return Response('Request not found', status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response(str(e), status=status.HTTP_400_BAD_REQUEST)



